"use client"

import type { ReactNode } from "react"
import { cn } from "../../utils"

export interface GridDarkColumn<T> {
  key: string
  label: string
  className?: string
  width?: string
  render: (item: T) => ReactNode
}

interface GridDarkAnimationProps<T> {
  columns: GridDarkColumn<T>[]
  items: T[]
  getItemId: (item: T, index: number) => string
  selectedId?: string | null
  onSelect?: (item: T) => void
  empty?: ReactNode
  className?: string
}

export function GridDarkAnimation<T>({
  columns,
  items,
  getItemId,
  selectedId,
  onSelect,
  empty,
  className,
}: GridDarkAnimationProps<T>) {
  if (items.length === 0) {
    return <>{empty}</>
  }

  const gridTemplateColumns = columns.map((column) => column.width || "minmax(140px, 1fr)").join(" ")

  return (
    <div
      className={cn(
        "relative overflow-auto rounded-lg border border-border bg-card text-foreground shadow-sm dark:border-white/10 dark:bg-neutral-950 dark:text-neutral-100",
        className,
      )}
    >
      <div aria-hidden className="pointer-events-none absolute inset-0 z-10 hidden overflow-hidden rounded-lg dark:block">
        <span className="ps-grid-beam-x absolute left-0 top-[38%] h-px w-1/2 bg-gradient-to-r from-transparent via-cyan-300/80 to-transparent blur-[0.5px]" />
        <span className="ps-grid-beam-y absolute left-[64%] top-0 h-1/2 w-px bg-gradient-to-b from-transparent via-violet-300/80 to-transparent blur-[0.5px]" />
      </div>
      <div
        className="relative z-0 grid min-w-[820px]"
        style={{ gridTemplateColumns }}
      >
        {columns.map((column) => (
          <div
            key={column.key}
            className={cn(
              "border-b border-border bg-muted/35 px-4 py-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground dark:border-white/10 dark:bg-white/[0.035] dark:text-neutral-400",
              column.className,
            )}
          >
            {column.label}
          </div>
        ))}

        {items.map((item, rowIndex) => {
          const id = getItemId(item, rowIndex)
          const active = selectedId === id
          const RowTag = onSelect ? "button" : "div"
          return (
            <RowTag
              key={id}
              type={onSelect ? "button" : undefined}
              onClick={onSelect ? () => onSelect(item) : undefined}
              className={cn(
                "group contents text-left outline-none",
                onSelect && "cursor-pointer",
              )}
            >
              {columns.map((column, columnIndex) => (
                <div
                  key={`${id}-${column.key}`}
                className={cn(
                  "relative min-h-[68px] overflow-hidden border-b border-r border-border px-4 py-4 text-sm text-foreground transition-colors duration-200 dark:border-white/10 dark:text-neutral-100",
                  "dark:before:pointer-events-none dark:before:absolute dark:before:inset-0 dark:before:opacity-0 dark:before:transition-opacity dark:before:duration-300 dark:before:content-['']",
                  "dark:before:bg-[radial-gradient(circle_at_18%_20%,rgba(99,102,241,0.24),transparent_34%),radial-gradient(circle_at_88%_10%,rgba(16,185,129,0.17),transparent_30%)]",
                  onSelect && "group-hover:bg-muted/55 group-focus-visible:ring-2 group-focus-visible:ring-primary/70 dark:group-hover:bg-white/[0.045] dark:group-hover:before:opacity-100",
                  active && "bg-primary/10 dark:bg-primary/15 dark:before:opacity-100",
                  columnIndex === columns.length - 1 && "border-r-0",
                  rowIndex === items.length - 1 && "border-b-0",
                  column.className,
                )}
              >
                <span className="relative z-10 block">{column.render(item)}</span>
                </div>
              ))}
            </RowTag>
          )
        })}
      </div>
    </div>
  )
}
