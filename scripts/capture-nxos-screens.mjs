import { mkdir, writeFile } from 'node:fs/promises'
import path from 'node:path'

const CDP = process.env.CDP_URL || 'http://127.0.0.1:9224'
const EMAIL = process.env.NXOS_EMAIL
const PASSWORD = process.env.NXOS_PASSWORD
const OUT_DIR = path.resolve('public/projects')

if (!EMAIL || !PASSWORD) {
  throw new Error('Set NXOS_EMAIL and NXOS_PASSWORD in the environment.')
}

async function getJson(url, options) {
  const response = await fetch(url, options)
  if (!response.ok) throw new Error(`${response.status} ${url}`)
  return response.json()
}

async function connectPage(matchUrl) {
  const tabs = await getJson(`${CDP}/json`)
  let tab = tabs.find((item) => item.type === 'page' && item.url.includes(matchUrl))
  if (!tab) {
    const encoded = encodeURIComponent(`https://${matchUrl}`)
    tab = await getJson(`${CDP}/json/new?${encoded}`, { method: 'PUT' })
  }

  const ws = new WebSocket(tab.webSocketDebuggerUrl)
  await new Promise((resolve, reject) => {
    ws.addEventListener('open', resolve, { once: true })
    ws.addEventListener('error', reject, { once: true })
  })

  let id = 0
  const send = (method, params = {}) => new Promise((resolve, reject) => {
    const callId = ++id
    const timer = setTimeout(() => reject(new Error(`Timeout: ${method}`)), 30000)
    const onMessage = (event) => {
      const message = JSON.parse(event.data)
      if (message.id !== callId) return
      clearTimeout(timer)
      ws.removeEventListener('message', onMessage)
      if (message.error) reject(new Error(JSON.stringify(message.error)))
      else resolve(message.result)
    }
    ws.addEventListener('message', onMessage)
    ws.send(JSON.stringify({ id: callId, method, params }))
  })

  await send('Runtime.enable')
  await send('Page.enable')
  await send('Emulation.setDeviceMetricsOverride', {
    width: 1440,
    height: 1000,
    deviceScaleFactor: 1,
    mobile: false,
  })

  return { ws, send }
}

async function wait(ms) {
  await new Promise((resolve) => setTimeout(resolve, ms))
}

async function evaluate(send, expression) {
  const result = await send('Runtime.evaluate', {
    expression,
    returnByValue: true,
    awaitPromise: true,
  })
  if (result.exceptionDetails) {
    throw new Error(result.exceptionDetails.text || 'Runtime evaluation failed')
  }
  return result.result?.value
}

async function navigate(send, url, delay = 5000) {
  await send('Page.navigate', { url })
  await wait(delay)
}

async function clickByText(send, text, selector = 'button, a') {
  return evaluate(send, `
    (() => {
      const needle = ${JSON.stringify(text)}.toLowerCase();
      const element = Array.from(document.querySelectorAll(${JSON.stringify(selector)}))
        .find((el) => (el.innerText || el.textContent || '').toLowerCase().includes(needle));
      element?.click();
      return element?.innerText || element?.textContent || null;
    })()
  `)
}

async function maskSensitive(send) {
  await evaluate(send, `
    (() => {
      document.querySelectorAll('[data-codex-mask]').forEach((el) => el.remove());
      const sensitivePatterns = [
        /[\\w.+-]+@[\\w.-]+\\.[a-z]{2,}/i,
        /\\b\\d{3}\\.?\\d{3}\\.?\\d{3}-?\\d{2}\\b/,
        /\\(\\d{2}\\)\\s?\\d{4,5}-?\\d{4}/,
        /\\b\\d{8,13}\\b/,
        /\\b\\d{2}\\.?\\d{3}\\.?\\d{3}\\/?\\d{4}-?\\d{2}\\b/,
        /Pedro\\s+Lucas\\s+Aguiar/i,
        /Ricardo\\s+Moitinho/i,
        /Samuel\\s+Austral/i,
        /Empresa\\s+Sandbox\\s+NXOS\\s+LTDA/i,
        /Avenida\\s+Paulista/i,
        /Catu,\\s*Bahia/i,
        /S[aã]o\\s+Paulo/i,
        /colaborador(?:teste)?@teste\\.com/i,
        /cliente(?:teste)?@teste\\.com/i
      ];
      const hiddenTags = new Set(['SCRIPT', 'STYLE', 'NOSCRIPT', 'SVG']);
      const rects = [];
      const targets = new Set();
      const pushRect = (rect) => {
        if (!rect || rect.width < 8 || rect.height < 8) return;
        if (rect.bottom < 0 || rect.right < 0 || rect.top > window.innerHeight || rect.left > window.innerWidth) return;
        rects.push({
          left: rect.left,
          top: rect.top,
          width: rect.width,
          height: rect.height,
        });
      };
      const isSensitive = (value) => sensitivePatterns.some((pattern) => pattern.test(String(value || '')));
      const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, {
        acceptNode(node) {
          const parent = node.parentElement;
          if (!parent || hiddenTags.has(parent.tagName)) return NodeFilter.FILTER_REJECT;
          const text = node.textContent || '';
          return isSensitive(text)
            ? NodeFilter.FILTER_ACCEPT
            : NodeFilter.FILTER_REJECT;
        }
      });
      while (walker.nextNode()) {
        if (walker.currentNode.parentElement) targets.add(walker.currentNode.parentElement);
        const range = document.createRange();
        range.selectNodeContents(walker.currentNode);
        Array.from(range.getClientRects()).forEach(pushRect);
        range.detach();
      }

      Array.from(document.querySelectorAll('input, textarea, select')).forEach((element) => {
        const value = element.value || element.getAttribute('value') || element.textContent || '';
        if (isSensitive(value)) {
          targets.add(element);
          pushRect(element.getBoundingClientRect());
        }
      });

      Array.from(document.querySelectorAll('[title], [aria-label]')).forEach((element) => {
        const value = [element.getAttribute('title'), element.getAttribute('aria-label')].join(' ');
        if (isSensitive(value)) {
          targets.add(element);
          pushRect(element.getBoundingClientRect());
        }
      });

      targets.forEach((element) => {
        element.dataset.codexSensitiveOriginalStyle = element.getAttribute('style') || '';
        element.style.filter = 'blur(6px)';
        element.style.webkitFilter = 'blur(6px)';
        element.style.userSelect = 'none';
        if ('value' in element && isSensitive(element.value)) {
          element.value = '••••••••••';
        }
      });

      rects.forEach((rect) => {
        const mask = document.createElement('div');
        mask.dataset.codexMask = 'true';
        mask.style.position = 'fixed';
        mask.style.left = Math.max(0, rect.left - 4) + 'px';
        mask.style.top = Math.max(0, rect.top - 3) + 'px';
        mask.style.width = Math.min(window.innerWidth - rect.left, rect.width + 8) + 'px';
        mask.style.height = Math.min(window.innerHeight - rect.top, rect.height + 6) + 'px';
        mask.style.zIndex = '2147483647';
        mask.style.borderRadius = '8px';
        mask.style.backdropFilter = 'blur(10px)';
        mask.style.webkitBackdropFilter = 'blur(10px)';
        mask.style.background = 'rgba(248, 250, 252, 0.52)';
        mask.style.pointerEvents = 'none';
        document.body.appendChild(mask);
      });
      return rects.length;
    })()
  `)
}

async function screenshot(send, relativeFile, { mask = true } = {}) {
  if (mask) await maskSensitive(send)
  const file = path.join(OUT_DIR, relativeFile)
  await mkdir(path.dirname(file), { recursive: true })
  const result = await send('Page.captureScreenshot', {
    format: 'png',
    captureBeyondViewport: false,
  })
  await writeFile(file, Buffer.from(result.data, 'base64'))
  console.log(file)
}

async function loginDevNxos(send) {
  await navigate(send, 'https://dev.nxoserp.com/login/', 5000)
  if (!(await evaluate(send, `location.href`)).includes('/login')) return

  await evaluate(send, `
    (() => {
      const inputs = Array.from(document.querySelectorAll('input'));
      const email = inputs.find((el) => /email|user|login/i.test([el.name, el.id, el.placeholder, el.type].join(' '))) || inputs[0];
      const password = inputs.find((el) => /password|senha/i.test([el.name, el.id, el.placeholder, el.type].join(' '))) || inputs[1];
      email.value = '';
      password.value = '';
      email.focus();
    })()
  `)
  await send('Input.insertText', { text: EMAIL })
  await evaluate(send, `document.querySelector('#password, input[type=password]')?.focus()`)
  await send('Input.insertText', { text: PASSWORD })
  await evaluate(send, `
    (() => {
      const buttons = Array.from(document.querySelectorAll('button'));
      const submit = buttons.find((el) => /entrar|login|acessar|sign/i.test(el.innerText)) || buttons.find((el) => el.type === 'submit') || buttons[0];
      submit?.click();
    })()
  `)
  await wait(8000)
}

async function openHub(send) {
  await navigate(send, 'https://dev.nxoserp.com/hub/', 4000)
}

async function captureHub(send) {
  await openHub(send)
  await screenshot(send, 'hub/1.png')
  await clickByText(send, 'Financeiro')
  await wait(3500)
  await screenshot(send, 'hub/2.png')
  await clickByText(send, 'Gestão do Sistema')
  await wait(3500)
  await screenshot(send, 'hub/3.png')
}

async function captureModuleScreens(send, { label, storageKey, files }) {
  for (const [file, moduleId] of files) {
    await openHub(send)
    await evaluate(send, `localStorage.setItem(${JSON.stringify(storageKey)}, ${JSON.stringify(moduleId)})`)
    await clickByText(send, label)
    await wait(8500)
    await screenshot(send, file)
  }
}

async function captureExternal(send) {
  const supportSteps = [
    ['support/1.png', async () => {
      await navigate(send, 'https://support.nxosbr.com/', 7000)
    }],
    ['support/2.png', async () => {
      await clickByText(send, 'Login Manual')
      await wait(2500)
    }],
    ['support/3.png', async () => {
      await clickByText(send, 'Microsoft 365')
      await wait(4500)
    }],
  ]
  for (const [file, action] of supportSteps) {
    await action()
    await screenshot(send, file)
  }

  const careersSteps = [
    ['careers/1.png', async () => {
      await navigate(send, 'https://careers.nxosbr.com/', 7000)
    }],
    ['careers/2.png', async () => {
      await clickByText(send, 'Ver Vagas Abertas')
      await wait(3500)
    }],
    ['careers/3.png', async () => {
      await clickByText(send, 'Admin')
      await wait(4500)
    }],
  ]
  for (const [file, action] of careersSteps) {
    await action()
    await screenshot(send, file)
  }
}

const { ws, send } = await connectPage('dev.nxoserp.com')

await loginDevNxos(send)
await captureHub(send)
await captureModuleScreens(send, {
  label: 'FieldOps',
  storageKey: 'nxos:lists:activeModule',
  files: [
    ['fieldops/1.png', 'atividades'],
    ['fieldops/2.png', 'solicitar-servicos'],
    ['fieldops/3.png', 'aprovacoes'],
  ],
})
await captureModuleScreens(send, {
  label: 'PeopleSync',
  storageKey: 'nxos:ps:activeModule',
  files: [
    ['rh/1.png', 'employees'],
    ['rh/2.png', 'punches'],
    ['rh/3.png', 'validation'],
  ],
})
await captureModuleScreens(send, {
  label: 'Measurement Reports',
  storageKey: 'nxos:mr:activeModule',
  files: [
    ['medicao/1.png', 'clientes'],
    ['medicao/2.png', 'medicao'],
    ['medicao/3.png', 'navegador'],
  ],
})
await captureExternal(send)

ws.close()
