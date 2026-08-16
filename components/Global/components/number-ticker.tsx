"use client"

import * as React from "react"

interface NumberTickerProps {
  value?: number
  duration?: number
}

export default function NumberTicker({
  value = 100,
  duration = 1500,
}: NumberTickerProps) {
  const [number, setNumber] = React.useState(0)

  React.useEffect(() => {
    let animationFrame: number
    let startTime: number | null = null

    const animate = (time: number) => {
      if (startTime === null) {
        startTime = time
      }

      const elapsed = time - startTime
      const progress = Math.min(elapsed / duration, 1)

      // Suavização da animação
      const eased =
        1 - Math.pow(1 - progress, 3)

      setNumber(Math.round(value * eased))

      if (progress < 1) {
        animationFrame =
          requestAnimationFrame(animate)
      }
    }

    animationFrame =
      requestAnimationFrame(animate)

    return () =>
      cancelAnimationFrame(animationFrame)
  }, [value, duration])

  return (
    <>
      <style>{`
        .number-ticker {
          font-family:
            Inter,
            system-ui,
            -apple-system,
            BlinkMacSystemFont,
            "Segoe UI",
            sans-serif;

          font-size: 96px;
          font-weight: 500;
          letter-spacing: -0.06em;
          line-height: 1;

          color: #000000;

          white-space: pre-wrap;
          font-variant-numeric: tabular-nums;
        }

        html.dark .number-ticker {
          color: #ffffff;
        }
      `}</style>

      <span className="number-ticker">
        {number}
      </span>
    </>
  )
}