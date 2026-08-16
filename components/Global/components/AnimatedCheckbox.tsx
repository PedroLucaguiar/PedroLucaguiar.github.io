"use client"

import * as React from "react"

export default function AnimatedCheckbox() {
  const [checked, setChecked] = React.useState(false)

  return (
    <>
      <style>{`
        .checkbox-container {
          display: inline-flex;
          align-items: center;
          justify-content: center;
        }

        .check {
          cursor: pointer;
          position: relative;
          margin: auto;
          width: 18px;
          height: 18px;
          -webkit-tap-highlight-color: transparent;
          transform: translate3d(0, 0, 0);
        }

        .check::before {
          content: "";
          position: absolute;
          top: -15px;
          left: -15px;
          width: 48px;
          height: 48px;
          border-radius: 50%;
          background: rgba(34, 50, 84, 0.03);
          opacity: 0;
          transition: opacity 0.2s ease;
        }

        .check svg {
          position: relative;
          z-index: 1;
          fill: none;
          stroke-linecap: round;
          stroke-linejoin: round;
          stroke: #c8ccd4;
          stroke-width: 1.5;
          transform: translate3d(0, 0, 0);
          transition: all 0.2s ease;
        }

        .check svg path {
          stroke-dasharray: 60;
          stroke-dashoffset: 0;
        }

        .check svg polyline {
          stroke-dasharray: 22;
          stroke-dashoffset: 66;
        }

        .check:hover::before {
          opacity: 1;
        }

        .check:hover svg {
          stroke: #a3e583;
        }

        .check.is-checked svg {
          stroke: #a3e583;
        }

        .check.is-checked svg path {
          stroke-dashoffset: 60;
          transition: all 0.3s linear;
        }

        .check.is-checked svg polyline {
          stroke-dashoffset: 42;
          transition: all 0.2s linear;
          transition-delay: 0.15s;
        }
      `}</style>

      <div className="checkbox-container">
        <button
          type="button"
          role="checkbox"
          aria-checked={checked}
          aria-label="Selecionar"
          onClick={() => setChecked((value) => !value)}
          className={`check ${checked ? "is-checked" : ""}`}
          style={{
            border: 0,
            padding: 0,
            background: "transparent",
          }}
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 18 18"
            aria-hidden="true"
          >
            <path d="M 1 9 L 1 9 c 0 -5 3 -8 8 -8 L 9 1 C 14 1 17 5 17 9 L 17 9 c 0 4 -4 8 -8 8 L 9 17 C 5 17 1 14 1 9 L 1 9 Z" />
            <polyline points="1 9 7 14 15 4" />
          </svg>
        </button>
      </div>
    </>
  )
}