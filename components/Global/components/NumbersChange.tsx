"use client"

import * as React from "react"

interface NumberFlowProps {
  value: number
  duration?: number
}

function formatNumber(value: number) {
  return new Intl.NumberFormat("pt-BR", {
    minimumFractionDigits: value % 1 === 0 ? 0 : 2,
    maximumFractionDigits: 2,
  }).format(value)
}

export default function NumberFlow({
  value,
  duration = 700,
}: NumberFlowProps) {
  const [displayValue, setDisplayValue] = React.useState(value)
  const previousValue = React.useRef(value)

  React.useEffect(() => {
    const startValue = displayValue
    const endValue = value
    const startTime = performance.now()

    previousValue.current = value

    let frame: number

    const animate = (time: number) => {
      const elapsed = time - startTime
      const progress = Math.min(elapsed / duration, 1)

      const eased = 1 - Math.pow(1 - progress, 3)

      const nextValue =
        startValue + (endValue - startValue) * eased

      setDisplayValue(nextValue)

      if (progress < 1) {
        frame = requestAnimationFrame(animate)
      } else {
        setDisplayValue(endValue)
      }
    }

    frame = requestAnimationFrame(animate)

    return () => cancelAnimationFrame(frame)
  }, [value, duration])

  return (
    <>
      <style>{`
        .number-flow {
          display: inline-block;

          font-variant-numeric: tabular-nums;

          animation:
            number-flow-pop
            420ms
            cubic-bezier(0.16, 1, 0.3, 1);
        }

        @keyframes number-flow-pop {
          from {
            opacity: 0;
            transform: translateY(8px) scale(0.98);
            filter: blur(3px);
          }

          to {
            opacity: 1;
            transform: translateY(0) scale(1);
            filter: blur(0);
          }
        }
      `}</style>

      <span key={value} className="number-flow">
        {formatNumber(displayValue)}
      </span>
    </>
  )
}