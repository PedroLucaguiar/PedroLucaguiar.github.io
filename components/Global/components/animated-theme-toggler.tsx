"use client"

import * as React from "react"

export type TransitionVariant =
  | "circle"
  | "square"
  | "triangle"
  | "diamond"
  | "hexagon"
  | "rectangle"
  | "star"

interface AnimatedThemeTogglerProps
  extends React.ComponentPropsWithoutRef<"button"> {
  duration?: number
  variant?: TransitionVariant
  fromCenter?: boolean
  theme?: "light" | "dark"
  onThemeChange?: (theme: "light" | "dark") => void
}

function MoonIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="16"
      height="16"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  )
}

function SunIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="16"
      height="16"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="4" />

      <path d="M12 2v2" />
      <path d="M12 20v2" />
      <path d="m4.93 4.93 1.41 1.41" />
      <path d="m17.66 17.66 1.41 1.41" />
      <path d="M2 12h2" />
      <path d="M20 12h2" />
      <path d="m6.34 17.66-1.41 1.41" />
      <path d="m19.07 4.93-1.41 1.41" />
    </svg>
  )
}

function getClipPaths(
  cx: number,
  cy: number,
  maxRadius: number,
  viewportWidth: number,
  viewportHeight: number
): [string, string] {
  const toX = (x: number) => `${(x / viewportWidth) * 100}%`
  const toY = (y: number) => `${(y / viewportHeight) * 100}%`
  const center = `${toX(cx)} ${toY(cy)}`
  const radius =
    `${(maxRadius / (Math.hypot(viewportWidth, viewportHeight) / Math.SQRT2)) * 100}%`

  return [
    `circle(0% at ${center})`,
    `circle(${radius} at ${center})`,
  ]
}

export default function AnimatedThemeToggler({
  className = "",
  duration = 500,
  variant: _variant = "circle",
  fromCenter: _fromCenter = false,
  theme,
  onThemeChange,
  style,
  ...props
}: AnimatedThemeTogglerProps) {
  const controlled = theme !== undefined

  const [internalTheme, setInternalTheme] =
    React.useState<"light" | "dark">("light")

  const buttonRef = React.useRef<HTMLButtonElement>(null)
  const transitioning = React.useRef(false)

  const currentTheme = controlled
    ? theme
    : internalTheme

  const isDark = currentTheme === "dark"

  React.useEffect(() => {
    if (controlled) return

    const saved = localStorage.getItem("theme")

    const dark =
      saved === "dark" ||
      document.documentElement.classList.contains("dark")

    const initialTheme = dark ? "dark" : "light"

    document.documentElement.classList.toggle(
      "dark",
      initialTheme === "dark"
    )

    setInternalTheme(initialTheme)

    const observer = new MutationObserver(() => {
      setInternalTheme(
        document.documentElement.classList.contains("dark")
          ? "dark"
          : "light"
      )
    })

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    })

    return () => observer.disconnect()
  }, [controlled])

  React.useEffect(() => {
    if (!controlled) return

    document.documentElement.classList.toggle(
      "dark",
      theme === "dark"
    )
  }, [controlled, theme])

  const toggleTheme = React.useCallback(() => {
    const button = buttonRef.current

    if (!button || transitioning.current) return

    const newTheme: "light" | "dark" =
      isDark ? "light" : "dark"

    const applyTheme = () => {
      document.documentElement.classList.toggle(
        "dark",
        newTheme === "dark"
      )
      localStorage.setItem("theme", newTheme)

      if (controlled) {
        onThemeChange?.(newTheme)
      } else {
        setInternalTheme(newTheme)
      }
    }

    const rect = button.getBoundingClientRect()
    const x = rect.left + rect.width / 2
    const y = rect.top + rect.height / 2

    const maxRadius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y)
    )

    const documentWithTransition = document as Document & {
      startViewTransition?: (
        callback: () => void
      ) => {
        ready: Promise<void>
        finished: Promise<void>
      }
    }

    if (
      typeof documentWithTransition.startViewTransition !==
      "function"
    ) {
      applyTheme()
      return
    }

    const clipPath = getClipPaths(
      x,
      y,
      maxRadius,
      window.innerWidth,
      window.innerHeight
    )

    const root = document.documentElement

    root.dataset.themeTransition = "active"

    root.style.setProperty(
      "--theme-transition-from",
      clipPath[0]
    )

    transitioning.current = true

    const transition =
      documentWithTransition.startViewTransition(() => {
        applyTheme()
      })

    transition.ready
      .then(() => {
        root.animate(
          {
            clipPath,
          },
          {
            duration,
            easing: "ease-in-out",
            fill: "forwards",
            pseudoElement:
              "::view-transition-new(root)",
          }
        )
      })
      .catch(() => {})

    transition.finished
      .finally(() => {
        transitioning.current = false

        delete root.dataset.themeTransition

        root.style.removeProperty(
          "--theme-transition-from"
        )
      })
      .catch(() => {})
  }, [controlled, duration, isDark, onThemeChange])

  return (
    <>
      <style>{`
        :root {
          color-scheme: light;
        }

        :root.dark {
          color-scheme: dark;
        }

        .animated-theme-toggler {
          width: 34px;
          height: 34px;

          display: inline-grid;
          place-items: center;

          padding: 0;

          border: 1px solid #e5e7eb;
          border-radius: 999px;

          background: color-mix(in oklch, var(--background) 70%, transparent);
          color: var(--muted-foreground);

          box-shadow:
            0 1px 2px rgba(15, 23, 42, 0.08);

          cursor: pointer;

          transition:
            transform 150ms ease,
            background-color 200ms ease,
            color 200ms ease,
            border-color 200ms ease;
        }

        .animated-theme-toggler:hover {
          transform: translateY(-1px);
        }

        .animated-theme-toggler:active {
          transform: scale(0.96);
        }

        .animated-theme-toggler:focus-visible {
          outline: none;

          box-shadow:
            0 0 0 3px rgba(59, 130, 246, 0.25);
        }

        html.dark .animated-theme-toggler {
          background: color-mix(in oklch, var(--background) 70%, transparent);
          color: var(--foreground);
          border-color: color-mix(in oklch, var(--border) 80%, transparent);
        }

        .animated-theme-toggler svg {
          display: block;
          width: 16px;
          height: 16px;
        }

        ::view-transition-old(root),
        ::view-transition-new(root) {
          animation: none;
          mix-blend-mode: normal;
        }

        html[data-theme-transition="active"]
          ::view-transition-new(root) {
          clip-path: var(--theme-transition-from);
        }

      `}</style>

      <button
        {...props}
        ref={buttonRef}
        type="button"
        onClick={toggleTheme}
        aria-label={
          isDark
            ? "Ativar tema claro"
            : "Ativar tema escuro"
        }
        className={`animated-theme-toggler ${className}`}
        style={style}
      >
        {isDark ? <SunIcon /> : <MoonIcon />}
      </button>
    </>
  )
}
