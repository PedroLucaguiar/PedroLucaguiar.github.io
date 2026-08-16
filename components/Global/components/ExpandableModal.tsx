"use client"

import * as React from "react"

export default function ExpandableModal() {
  const [open, setOpen] = React.useState(false)
  const [closing, setClosing] = React.useState(false)

  const buttonRef = React.useRef<HTMLButtonElement>(null)

  const [origin, setOrigin] = React.useState({
    x: 0,
    y: 0,
  })

  // =========================
  // ABRIR
  // =========================

  const openModal = () => {
    const button = buttonRef.current

    if (button) {
      const rect = button.getBoundingClientRect()

      setOrigin({
        x: rect.left + rect.width / 2,
        y: rect.top + rect.height / 2,
      })
    }

    setClosing(false)
    setOpen(true)
  }

  // =========================
  // FECHAR
  // =========================

  const closeModal = () => {
    setClosing(true)

    setTimeout(() => {
      setOpen(false)
      setClosing(false)
    }, 700)
  }

  // Bloqueia scroll + ESC
  React.useEffect(() => {
    if (!open) return

    document.body.style.overflow = "hidden"

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && !closing) {
        closeModal()
      }
    }

    window.addEventListener("keydown", handleKeyDown)

    return () => {
      document.body.style.overflow = ""
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [open, closing])

  return (
    <>
      <style>{`

        /* =========================
           BOTÃO
        ========================= */

        .expand-trigger {
          height: 44px;
          padding: 0 20px;

          border: 0;
          border-radius: 10px;

          background: #18181b;
          color: white;

          font-family: inherit;
          font-size: 14px;
          font-weight: 500;

          cursor: pointer;

          transition:
            transform 200ms ease,
            background-color 200ms ease,
            box-shadow 200ms ease;
        }

        .expand-trigger:hover {
          background: #27272a;

          transform: translateY(-1px);

          box-shadow:
            0 8px 20px rgba(0, 0, 0, 0.12);
        }

        .expand-trigger:active {
          transform: scale(0.97);
        }


        /* =========================
           MODAL
        ========================= */

        .expand-modal {
          position: fixed;
          inset: 0;

          width: 100vw;
          height: 100dvh;

          background: #18181b;

          z-index: 9999;

          overflow: hidden;

          will-change:
            clip-path,
            opacity;
        }


        /* ABRIR */

        .expand-modal.opening {
          animation:
            modal-open
            850ms
            cubic-bezier(0.16, 1, 0.3, 1)
            forwards;
        }


        /* FECHAR */

        .expand-modal.closing {
          animation:
            modal-close
            700ms
            cubic-bezier(0.7, 0, 0.3, 1)
            forwards;
        }


        /* =========================
           ANIMAÇÃO ABRIR
        ========================= */

        @keyframes modal-open {

          0% {
            clip-path:
              circle(
                0px at
                var(--origin-x)
                var(--origin-y)
              );

            opacity: 0.9;
          }

          20% {
            opacity: 1;
          }

          100% {
            clip-path:
              circle(
                150vmax at
                var(--origin-x)
                var(--origin-y)
              );

            opacity: 1;
          }

        }


        /* =========================
           ANIMAÇÃO FECHAR
        ========================= */

        @keyframes modal-close {

          0% {
            clip-path:
              circle(
                150vmax at
                var(--origin-x)
                var(--origin-y)
              );

            opacity: 1;
          }

          100% {
            clip-path:
              circle(
                0px at
                var(--origin-x)
                var(--origin-y)
              );

            opacity: 0.9;
          }

        }


        /* =========================
           BOTÃO X
        ========================= */

        .expand-close {
          position: absolute;

          top: 20px;
          right: 20px;

          width: 38px;
          height: 38px;

          display: grid;
          place-items: center;

          padding: 0;

          border:
            1px solid
            rgba(255,255,255,0.14);

          border-radius: 50%;

          background:
            rgba(255,255,255,0.08);

          color: white;

          cursor: pointer;

          backdrop-filter: blur(10px);

          opacity: 0;

          animation:
            close-appear
            350ms
            300ms
            ease
            forwards;

          transition:
            background 200ms ease,
            transform 250ms ease;
        }

        .expand-close:hover {
          background:
            rgba(255,255,255,0.16);

          transform: rotate(90deg);
        }

        .expand-close:active {
          transform:
            rotate(90deg)
            scale(0.9);
        }

        .expand-close svg {
          width: 17px;
          height: 17px;
        }


        @keyframes close-appear {

          from {
            opacity: 0;
            transform: scale(0.8);
          }

          to {
            opacity: 1;
            transform: scale(1);
          }

        }


        /* Esconde X durante fechamento */

        .expand-modal.closing
        .expand-close {
          animation: none;

          opacity: 0;

          transform: scale(0.8);

          transition:
            opacity 150ms ease,
            transform 150ms ease;
        }


        /* =========================
           MOBILE
        ========================= */

        @media (max-width: 640px) {

          .expand-close {
            top: 16px;
            right: 16px;
          }

        }


        /* =========================
           REDUZIR MOVIMENTO
        ========================= */

        @media (
          prefers-reduced-motion: reduce
        ) {

          .expand-modal.opening,
          .expand-modal.closing {
            animation-duration: 1ms;
          }

        }

      `}</style>


      {/* BOTÃO */}

      <button
        ref={buttonRef}
        type="button"
        className="expand-trigger"
        onClick={openModal}
      >
        Abrir
      </button>


      {/* MODAL */}

      {open && (
        <div
          className={`expand-modal ${
            closing
              ? "closing"
              : "opening"
          }`}
          style={
            {
              "--origin-x":
                `${origin.x}px`,

              "--origin-y":
                `${origin.y}px`,
            } as React.CSSProperties
          }
        >

          {/* FECHAR */}

          <button
            type="button"
            className="expand-close"
            onClick={closeModal}
            aria-label="Fechar"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M18 6 6 18" />
              <path d="m6 6 12 12" />
            </svg>
          </button>


          {/* CONTEÚDO AQUI */}


        </div>
      )}

    </>
  )
}