"use client"

import { Building2, Home, Store } from "lucide-react"

const data = [
  {
    value: "living-area",
    label: "Living area",
    icon: Home,
  },
  {
    value: "shopping-area",
    label: "Shopping area",
    icon: Store,
  },
  {
    value: "business-park",
    label: "Business park",
    icon: Building2,
  },
]

export function SelectIconExample() {
  return (
    <label className="mx-auto block w-[250px] space-y-2 text-sm">
      <span className="font-medium text-foreground">Select area</span>
      <select className="h-10 w-full rounded-md border border-border bg-background px-3 text-sm text-foreground outline-none transition-colors focus:border-primary/60">
        {data.map((item) => (
          <option key={item.value} value={item.value}>
            {item.label}
          </option>
        ))}
      </select>
      <div className="grid gap-1 rounded-md border border-border bg-muted/30 p-2">
        {data.map((item) => {
          const Icon = item.icon
          return (
            <span key={item.value} className="flex items-center gap-2 text-xs text-muted-foreground">
              <Icon className="size-4 shrink-0" aria-hidden="true" />
              {item.label}
            </span>
          )
        })}
      </div>
    </label>
  )
}
