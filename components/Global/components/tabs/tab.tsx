"use client"

import { useEffect, useRef, useState } from "react"
import { cn } from "../../utils"

export type Tab = {
  id: string
  label: string
  badge?: number
}

interface VercelTabsProps<T extends string = string> {
  tabs: Array<Tab & { id: T }>
  defaultValue?: T
  value?: T
  onValueChange?: (value: T) => void
  className?: string
}

export interface StandardTabItem<T extends string = string> {
  value: T
  label: string
  badge?: number
}

interface StandardTabsProps<T extends string = string> {
  items: StandardTabItem<T>[]
  value: T
  onValueChange: (value: T) => void
  className?: string
}

export function VercelTabs<T extends string = string>({
  tabs,
  defaultValue,
  value: controlledValue,
  onValueChange,
  className,
}: VercelTabsProps<T>) {
  const [activeTab, setActiveTab] = useState<T | undefined>(
    controlledValue ?? defaultValue ?? tabs[0]?.id,
  )
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const [hoverStyle, setHoverStyle] = useState({ left: "0px", width: "0px" })
  const [activeStyle, setActiveStyle] = useState({ left: "0px", width: "0px" })
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([])

  const isControlled = controlledValue !== undefined
  const currentTab = isControlled ? controlledValue : activeTab

  useEffect(() => {
    if (isControlled) setActiveTab(controlledValue)
  }, [controlledValue, isControlled])

  useEffect(() => {
    const activeIndex = tabs.findIndex((tab) => tab.id === currentTab)
    const activeElement = tabRefs.current[activeIndex]
    if (!activeElement) return

    setActiveStyle({
      left: `${activeElement.offsetLeft}px`,
      width: `${activeElement.offsetWidth}px`,
    })
  }, [currentTab, tabs])

  useEffect(() => {
    if (hoveredIndex === null) return
    const hoveredElement = tabRefs.current[hoveredIndex]
    if (!hoveredElement) return

    setHoverStyle({
      left: `${hoveredElement.offsetLeft}px`,
      width: `${hoveredElement.offsetWidth}px`,
    })
  }, [hoveredIndex])

  function handleTabClick(tabId: T) {
    if (!isControlled) setActiveTab(tabId)
    onValueChange?.(tabId)
  }

  return (
    <div className={cn("relative overflow-x-auto border-b border-border", className)}>
      <div className="relative flex min-w-max items-center" onMouseLeave={() => setHoveredIndex(null)}>
        <div
          className={cn(
            "absolute h-[30px] rounded-md bg-neutral-100 opacity-0 transition-[left,width,opacity] duration-200 dark:bg-neutral-800",
            hoveredIndex !== null && "opacity-100",
          )}
          style={hoverStyle}
        />

        <div
          className="absolute bottom-[-1px] h-[2px] bg-foreground transition-[left,width] duration-200 dark:bg-white"
          style={activeStyle}
        />

        {tabs.map((tab, index) => {
          const active = currentTab === tab.id
          return (
            <button
              key={tab.id}
              ref={(element) => {
                tabRefs.current[index] = element
              }}
              type="button"
              onClick={() => handleTabClick(tab.id)}
              onMouseEnter={() => setHoveredIndex(index)}
              className={cn(
                "relative z-10 flex items-center gap-2 px-3 py-1.5 text-sm font-medium transition-colors",
                active
                  ? "text-foreground dark:text-white"
                  : "text-muted-foreground hover:text-foreground dark:text-neutral-400 dark:hover:text-neutral-200",
              )}
            >
              <span>{tab.label}</span>
              {typeof tab.badge === "number" ? (
                <span
                  className={cn(
                    "inline-flex h-5 min-w-5 items-center justify-center rounded-full px-1.5 text-[11px] font-bold",
                    active
                      ? "bg-foreground/10 text-foreground dark:bg-white/15 dark:text-white"
                      : "bg-muted text-muted-foreground dark:bg-white/10 dark:text-neutral-300",
                  )}
                >
                  {tab.badge}
                </span>
              ) : null}
            </button>
          )
        })}
      </div>
    </div>
  )
}

export function StandardTabs<T extends string = string>({
  items,
  value,
  onValueChange,
  className,
}: StandardTabsProps<T>) {
  return (
    <VercelTabs
      tabs={items.map((item) => ({ id: item.value, label: item.label, badge: item.badge }))}
      value={value}
      onValueChange={onValueChange}
      className={className}
    />
  )
}
