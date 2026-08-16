import { readdir } from 'node:fs/promises'
import path from 'node:path'
import sharp from 'sharp'

const root = process.cwd()
const targets = [
  path.join(root, 'public', 'projects'),
  path.join(root, 'public', 'FotoProfissional.png'),
]

async function collectImages(target) {
  const entries = await readdir(target, { withFileTypes: true }).catch(() => null)

  if (!entries) {
    return /\.(png|jpe?g)$/i.test(target) ? [target] : []
  }

  const images = []

  for (const entry of entries) {
    const current = path.join(target, entry.name)

    if (entry.isDirectory()) {
      images.push(...await collectImages(current))
    } else if (/\.(png|jpe?g)$/i.test(entry.name)) {
      images.push(current)
    }
  }

  return images
}

function maxWidthFor(file) {
  const normalized = file.replaceAll(path.sep, '/')

  if (normalized.includes('/nxos-mobile/')) return 560
  if (normalized.endsWith('/FotoProfissional.png')) return 720
  return 1280
}

const files = (await Promise.all(targets.map(collectImages))).flat()

for (const file of files) {
  const output = file.replace(/\.(png|jpe?g)$/i, '.webp')
  const metadata = await sharp(file).metadata()
  const width = metadata.width && metadata.width > maxWidthFor(file)
    ? maxWidthFor(file)
    : metadata.width

  await sharp(file)
    .resize({ width, withoutEnlargement: true })
    .webp({ quality: 72, effort: 6 })
    .toFile(output)
}

console.log(`Optimized ${files.length} images`)
