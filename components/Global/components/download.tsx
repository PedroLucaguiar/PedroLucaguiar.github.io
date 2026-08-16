"use client"

import * as React from "react"

interface AnimatedFileButtonProps {
  fileName: string
  fileSize?: number
  duration?: number
  onCancel?: () => void
  onComplete?: () => void
}

function formatFileSize(bytes: number): string {
  if (bytes === 0) return "0 Bytes"

  const k = 1024
  const sizes = ["Bytes", "KB", "MB", "GB", "TB"]
  const index = Math.floor(Math.log(bytes) / Math.log(k))

  return `${parseFloat((bytes / Math.pow(k, index)).toFixed(2))} ${sizes[index]}`
}

function FileIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="file-icon-svg"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <path d="M14 2v6h6" />
      <path d="M16 13H8" />
      <path d="M16 17H8" />
      <path d="M10 9H8" />
    </svg>
  )
}

function CheckCircleIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="file-icon-svg check-animate"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M21.8 10A10 10 0 1 1 12 2" />
      <path d="m9 11 3 3L22 4" />
    </svg>
  )
}

function XIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="file-x-icon"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  )
}

export default function AnimatedFileButton({
  fileName,
  fileSize = 8100000,
  duration = 2600,
  onCancel,
  onComplete,
}: AnimatedFileButtonProps) {
  const [started, setStarted] = React.useState(false)
  const [progress, setProgress] = React.useState(0)
  const [complete, setComplete] = React.useState(false)

  React.useEffect(() => {
    if (!started || complete) return

    let frame: number
    let startTime: number | null = null

    const animate = (time: number) => {
      if (startTime === null) {
        startTime = time
      }

      const elapsed = time - startTime
      const rawProgress = Math.min(elapsed / duration, 1)
      const easedProgress = 1 - Math.pow(1 - rawProgress, 3)
      const nextProgress = Math.round(easedProgress * 100)

      setProgress(nextProgress)

      if (rawProgress < 1) {
        frame = requestAnimationFrame(animate)
      } else {
        setComplete(true)
        onComplete?.()
      }
    }

    frame = requestAnimationFrame(animate)

    return () => cancelAnimationFrame(frame)
  }, [started, complete, duration, onComplete])

  function handleStart() {
    setStarted(true)
    setProgress(0)
    setComplete(false)
  }

  function handleCancel() {
    setStarted(false)
    setProgress(0)
    setComplete(false)
    onCancel?.()
  }

  const uploadedSize = (fileSize * progress) / 100

  return (
    <>
      <style>{`
        .file-upload-wrapper {
          width: 100%;
          max-width: 448px;
          font-family:
            Inter,
            ui-sans-serif,
            system-ui,
            -apple-system,
            BlinkMacSystemFont,
            "Segoe UI",
            sans-serif;
        }

        .file-start-button {
          width: 100%;

          display: flex;
          align-items: center;
          gap: 12px;

          padding: 14px 16px;

          border: 1px solid #e4e4e7;
          border-radius: 14px;

          background: #ffffff;
          color: #18181b;

          font: inherit;
          font-size: 14px;
          font-weight: 600;

          cursor: pointer;

          box-shadow:
            0 1px 2px rgba(0, 0, 0, 0.04);

          transition:
            transform 180ms ease,
            box-shadow 180ms ease,
            border-color 180ms ease,
            background 180ms ease;
        }

        .file-start-button:hover {
          transform: translateY(-1px);
          border-color: #d4d4d8;
          background: #fafafa;

          box-shadow:
            0 8px 24px rgba(0, 0, 0, 0.08);
        }

        .file-start-button:active {
          transform: scale(0.98);
        }

        .file-card {
          width: 100%;

          display: flex;
          align-items: center;
          gap: 16px;

          padding: 16px;

          overflow: hidden;

          border: 1px solid #e4e4e7;
          border-radius: 14px;

          background: #ffffff;
          color: #18181b;

          box-shadow:
            0 1px 2px rgba(0, 0, 0, 0.04),
            0 12px 30px rgba(0, 0, 0, 0.04);

          animation:
            file-card-in
            320ms
            cubic-bezier(0.16, 1, 0.3, 1);
        }

        .file-card.complete {
          border-color: rgba(34, 197, 94, 0.45);
        }

        /* ÍCONE VERMELHO DURANTE O UPLOAD */

        .file-icon {
          width: 42px;
          height: 42px;

          flex-shrink: 0;

          display: grid;
          place-items: center;

          border-radius: 12px;

          background: #fee2e2;
          color: #ef4444;
        }

        /* ÍCONE VERDE QUANDO COMPLETO */

        .file-icon.complete {
          background: #dcfce7;
          color: #22c55e;

          animation:
            complete-pop
            420ms
            cubic-bezier(0.16, 1, 0.3, 1);
        }

        .file-icon-svg {
          width: 24px;
          height: 24px;
        }

        .check-animate {
          stroke-dasharray: 80;
          stroke-dashoffset: 80;

          animation:
            check-draw
            500ms
            120ms
            ease
            forwards;
        }

        .file-content {
          min-width: 0;
          flex: 1;
        }

        .file-name {
          margin: 0;

          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;

          font-size: 14px;
          font-weight: 600;
        }

        .file-progress-area {
          margin-top: 10px;

          display: grid;
          gap: 6px;
        }

        .file-progress {
          width: 100%;
          height: 8px;

          overflow: hidden;

          border-radius: 999px;

          background: #f4f4f5;
        }

        /* BARRA SEMPRE VERDE */

        .file-progress-fill {
          height: 100%;

          border-radius: inherit;

          background:
            linear-gradient(
              90deg,
              #22c55e,
              #16a34a
            );

          transition:
            width
            220ms
            ease;
        }

        .file-meta {
          display: flex;
          justify-content: space-between;
          gap: 12px;

          color: #71717a;

          font-size: 12px;
        }

        .file-cancel {
          width: 30px;
          height: 30px;

          flex-shrink: 0;

          display: grid;
          place-items: center;

          border: 0;
          border-radius: 999px;

          background: transparent;
          color: #71717a;

          cursor: pointer;

          transition:
            background 160ms ease,
            color 160ms ease,
            transform 160ms ease;
        }

        .file-cancel:hover {
          background: #f4f4f5;
          color: #18181b;
        }

        .file-cancel:active {
          transform: scale(0.92);
        }

        .file-x-icon {
          width: 16px;
          height: 16px;
        }

        @keyframes file-card-in {
          from {
            opacity: 0;
            transform:
              translateY(14px)
              scale(0.98);
          }

          to {
            opacity: 1;
            transform:
              translateY(0)
              scale(1);
          }
        }

        @keyframes complete-pop {
          0% {
            transform: scale(0.8);
          }

          60% {
            transform: scale(1.14);
          }

          100% {
            transform: scale(1);
          }
        }

        @keyframes check-draw {
          to {
            stroke-dashoffset: 0;
          }
        }
      `}</style>

      <div className="file-upload-wrapper">
        {!started ? (
          <button
            type="button"
            className="file-start-button"
            onClick={handleStart}
          >
            <span className="file-icon">
              <FileIcon />
            </span>

            <span>{fileName}</span>
          </button>
        ) : (
          <div className={`file-card ${complete ? "complete" : ""}`}>
            <div className={`file-icon ${complete ? "complete" : ""}`}>
              {complete ? <CheckCircleIcon /> : <FileIcon />}
            </div>

            <div className="file-content">
              <p className="file-name">{fileName}</p>

              <div className="file-progress-area">
                <div
                  className="file-progress"
                  role="progressbar"
                  aria-valuenow={progress}
                  aria-valuemin={0}
                  aria-valuemax={100}
                >
                  <div
                    className="file-progress-fill"
                    style={{
                      width: `${progress}%`,
                    }}
                  />
                </div>

                <div className="file-meta">
                  <span>
                    {complete
                      ? formatFileSize(fileSize)
                      : `${formatFileSize(uploadedSize)} de ${formatFileSize(
                          fileSize
                        )}`}
                  </span>

                  <span>
                    {complete ? "Completo" : `${progress}%`}
                  </span>
                </div>
              </div>
            </div>

            {!complete && (
              <button
                type="button"
                className="file-cancel"
                onClick={handleCancel}
                aria-label="Cancelar"
              >
                <XIcon />
              </button>
            )}
          </div>
        )}
      </div>
    </>
  )
}