"use client"

import * as React from "react"

export default function SelectVazio() {
  const [value, setValue] = React.useState("")
  const [open, setOpen] = React.useState(false)

  // Adicione suas opções aqui
  const options: string[] = []

  return (
    <>
      <style>{`
        .select-container {
          position: relative;
          width: 100%;
          max-width: 448px;
          font-family:
            Inter,
            system-ui,
            -apple-system,
            sans-serif;
        }

        /* BOTÃO */

        .select-trigger {
          width: 100%;
          height: 42px;

          display: flex;
          align-items: center;
          justify-content: space-between;

          padding: 0 16px;

          border: 1px solid #e4e4e7;
          border-radius: 999px;

          background: #ffffff;
          color: #18181b;

          font: inherit;
          font-size: 14px;

          cursor: pointer;

          transition:
            background 0.2s ease,
            border-color 0.2s ease,
            box-shadow 0.2s ease;
        }

        .select-trigger:hover {
          background: #fafafa;
          border-color: #d4d4d8;
        }

        .select-trigger:focus {
          outline: none;
          border-color: #a1a1aa;

          box-shadow:
            0 0 0 3px rgba(24, 24, 27, 0.06);
        }

        .select-placeholder {
          color: #a1a1aa;
        }

        /* SETA */

        .select-chevron {
          width: 16px;
          height: 16px;

          color: #71717a;

          transition: transform 0.2s ease;
        }

        .select-chevron.open {
          transform: rotate(180deg);
        }

        /* DROPDOWN */

        .select-menu {
          position: absolute;

          top: calc(100% + 6px);
          left: 0;

          z-index: 50;

          width: 100%;

          padding: 5px;

          background: #ffffff;

          border: 1px solid #e4e4e7;
          border-radius: 18px;

          box-shadow:
            0 10px 30px rgba(0, 0, 0, 0.08);

          animation:
            select-open 0.18s
            cubic-bezier(0.16, 1, 0.3, 1);
        }

        /* OPÇÕES */

        .select-option {
          width: 100%;
          height: 38px;

          display: flex;
          align-items: center;
          justify-content: space-between;

          padding: 0 12px;

          border: none;
          border-radius: 999px;

          background: transparent;
          color: #18181b;

          font: inherit;
          font-size: 14px;

          cursor: pointer;

          transition:
            background 0.15s ease;
        }

        .select-option:hover {
          background: #f4f4f5;
        }

        .select-option.active {
          background: #f4f4f5;
        }

        /* CHECK */

        .select-check {
          width: 16px;
          height: 16px;
        }

        /* ANIMAÇÃO */

        @keyframes select-open {
          from {
            opacity: 0;
            transform:
              translateY(-5px)
              scale(0.98);
          }

          to {
            opacity: 1;
            transform:
              translateY(0)
              scale(1);
          }
        }
      `}</style>

      <div className="select-container">

        <button
          type="button"
          className="select-trigger"
          onClick={() => setOpen(!open)}
        >
          <span
            className={
              !value
                ? "select-placeholder"
                : ""
            }
          >
            {value || "Selecione..."}
          </span>

          <svg
            className={`select-chevron ${
              open ? "open" : ""
            }`}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="m6 9 6 6 6-6" />
          </svg>
        </button>

        {open && options.length > 0 && (
          <div className="select-menu">

            {options.map((option) => {
              const selected =
                value === option

              return (
                <button
                  key={option}
                  type="button"
                  className={`select-option ${
                    selected
                      ? "active"
                      : ""
                  }`}
                  onClick={() => {
                    setValue(option)
                    setOpen(false)
                  }}
                >
                  <span>{option}</span>

                  {selected && (
                    <svg
                      className="select-check"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="m5 12 4 4L19 6" />
                    </svg>
                  )}
                </button>
              )
            })}

          </div>
        )}
      </div>
    </>
  )
}