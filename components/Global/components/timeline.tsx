"use client"

import * as React from "react"

interface TimelineProps {
  total?: number
  completed?: number
}

export default function Timeline({
  total = 5,
  completed = 3,
}: TimelineProps) {
  const [animated, setAnimated] = React.useState(false)

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setAnimated(true)
    }, 150)

    return () => clearTimeout(timer)
  }, [])

  return (
    <>
      <style>{`
        .timeline-only {
          position: relative;

          display: flex;
          flex-direction: column;
          align-items: center;

          width: 40px;
          padding: 8px 0;
        }

        /* Linha de fundo */

        .timeline-track {
          position: absolute;

          top: 18px;
          bottom: 18px;
          left: 50%;

          width: 2px;

          transform: translateX(-50%);

          background: #e4e4e7;

          border-radius: 999px;

          overflow: hidden;
        }

        /* Linha preenchida */

        .timeline-progress {
          position: absolute;

          top: 0;
          left: 0;

          width: 100%;
          height: 0;

          background: #18181b;

          border-radius: 999px;

          transition:
            height
            1200ms
            cubic-bezier(0.16, 1, 0.3, 1);
        }

        .timeline-only.is-animated
        .timeline-progress {
          height: var(--progress);
        }

        /* Pontos */

        .timeline-point {
          position: relative;

          z-index: 2;

          width: 22px;
          height: 22px;

          display: grid;
          place-items: center;

          flex-shrink: 0;

          border-radius: 50%;

          background: #ffffff;

          color: #a1a1aa;

          transform: scale(0.75);

          opacity: 0;

          transition:
            transform
              450ms
              cubic-bezier(0.16, 1, 0.3, 1),
            opacity
              300ms ease,
            color
              300ms ease;

          transition-delay:
            calc(var(--index) * 160ms);
        }

        .timeline-point svg {
          width: 22px;
          height: 22px;

          display: block;
        }

        .timeline-only.is-animated
        .timeline-point {
          opacity: 1;

          transform: scale(1);
        }

        /* Concluído */

        .timeline-point.completed {
          color: #18181b;
        }

        .timeline-only.is-animated
        .timeline-point.completed {
          animation:
            timeline-pop
            450ms
            cubic-bezier(0.16, 1, 0.3, 1)
            both;

          animation-delay:
            calc(
              200ms +
              var(--index) * 200ms
            );
        }

        /* Espaço entre os pontos */

        .timeline-space {
          height: 64px;
        }

        @keyframes timeline-pop {
          0% {
            opacity: 0;
            transform: scale(0.5);
          }

          60% {
            transform: scale(1.18);
          }

          100% {
            opacity: 1;
            transform: scale(1);
          }
        }

        @media (
          prefers-reduced-motion: reduce
        ) {
          .timeline-progress,
          .timeline-point {
            transition: none;
            animation: none !important;
          }

          .timeline-progress {
            height: var(--progress);
          }

          .timeline-point {
            opacity: 1;
            transform: scale(1);
          }
        }
      `}</style>

      <div
        className={`
          timeline-only
          ${animated ? "is-animated" : ""}
        `}
        style={
          {
            "--progress":
              total <= 1
                ? "0%"
                : `${
                    ((Math.max(
                      1,
                      Math.min(
                        completed,
                        total
                      )
                    ) -
                      1) /
                      (total - 1)) *
                    100
                  }%`,
          } as React.CSSProperties
        }
      >
        {/* Linha */}

        <div className="timeline-track">
          <div className="timeline-progress" />
        </div>

        {/* Pontos */}

        {Array.from({
          length: total,
        }).map((_, index) => {
          const isCompleted =
            index < completed

          return (
            <React.Fragment key={index}>
              <div
                className={`
                  timeline-point
                  ${
                    isCompleted
                      ? "completed"
                      : ""
                  }
                `}
                style={
                  {
                    "--index": index,
                  } as React.CSSProperties
                }
              >
                <svg
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>

              {index < total - 1 && (
                <div className="timeline-space" />
              )}
            </React.Fragment>
          )
        })}
      </div>
    </>
  )
}