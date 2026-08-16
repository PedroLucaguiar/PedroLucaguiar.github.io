"use client"

import * as React from "react"

export default function Pagination() {
  const [page, setPage] = React.useState(3)

  const pages = [1, 2, 3, 4, 5]

  return (
    <>
      <style>{`
        .cir-page {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          padding: 6px;
          background: #ffffff;
          border: 1px solid #e3e8ee;
          border-radius: 999px;
          box-shadow:
            0 1px 1px rgba(14, 17, 22, 0.04),
            0 18px 36px -24px rgba(14, 17, 22, 0.18);
          font-family: Inter, system-ui, -apple-system, sans-serif;
        }

        .cir-page__nav,
        .cir-page__num {
          display: inline-grid;
          place-items: center;
          min-width: 36px;
          height: 36px;
          padding: 0 10px;
          border: 0;
          border-radius: 999px;
          background: transparent;
          color: #5b6472;
          font: inherit;
          font-size: 13.5px;
          font-weight: 500;
          font-variant-numeric: tabular-nums;
          cursor: pointer;
          transition:
            background-color 200ms cubic-bezier(0.22, 1, 0.36, 1),
            color 200ms cubic-bezier(0.22, 1, 0.36, 1);
        }

        .cir-page__nav svg {
          width: 16px;
          height: 16px;
        }

        .cir-page__num:hover,
        .cir-page__nav:hover {
          background: rgba(14, 17, 22, 0.04);
          color: #0e1116;
        }

        .cir-page__num--active {
          background: #0e1116;
          color: #ffffff;
          box-shadow:
            0 1px 1px rgba(14, 17, 22, 0.06),
            0 8px 18px -10px rgba(14, 17, 22, 0.5);
        }

        .cir-page__num--active:hover {
          background: #1a1f28;
          color: #ffffff;
        }

        .cir-page__num:focus-visible,
        .cir-page__nav:focus-visible {
          outline: none;
          box-shadow: 0 0 0 3px rgba(46, 125, 239, 0.32);
        }

        .cir-page__gap {
          padding: 0 6px;
          color: #5b6472;
          font-size: 13px;
          user-select: none;
        }
      `}</style>

      <nav className="cir-page" aria-label="Pagination">
        <button
          className="cir-page__nav"
          type="button"
          aria-label="Previous page"
          onClick={() => setPage((current) => Math.max(1, current - 1))}
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="m15 18-6-6 6-6" />
          </svg>
        </button>

        {pages.map((number) => (
          <button
            key={number}
            className={`cir-page__num ${
              page === number ? "cir-page__num--active" : ""
            }`}
            type="button"
            aria-current={page === number ? "page" : undefined}
            onClick={() => setPage(number)}
          >
            {number}
          </button>
        ))}

        <span className="cir-page__gap" aria-hidden="true">
          …
        </span>

        <button
          className={`cir-page__num ${
            page === 24 ? "cir-page__num--active" : ""
          }`}
          type="button"
          aria-current={page === 24 ? "page" : undefined}
          onClick={() => setPage(24)}
        >
          24
        </button>

        <button
          className="cir-page__nav"
          type="button"
          aria-label="Next page"
          onClick={() => setPage((current) => Math.min(24, current + 1))}
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="m9 18 6-6-6-6" />
          </svg>
        </button>
      </nav>
    </>
  )
}