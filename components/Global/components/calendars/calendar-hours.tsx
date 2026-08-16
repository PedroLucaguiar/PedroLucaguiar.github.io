"use client"

import React from "react"

export const DatePickerTimeExample = () => {
  const [value, setValue] = React.useState("")

  return (
    <div className="mx-auto flex max-w-xs flex-col gap-2">
      <p className="text-gray-500">{value || "Select a date"}</p>
      <input
        type="datetime-local"
        value={value}
        onChange={(event) => setValue(event.target.value)}
        className="h-10 rounded-md border border-border bg-background px-3 text-sm text-foreground outline-none focus:border-primary/60"
      />
      <div className="flex justify-end gap-2">
        <button
          type="button"
          onClick={() => setValue("")}
          className="h-9 rounded-md bg-destructive px-3 text-sm font-medium text-destructive-foreground"
        >
          Reset
        </button>
        <button
          type="button"
          onClick={() => setValue(new Date().toISOString().slice(0, 16))}
          className="h-9 rounded-md bg-secondary px-3 text-sm font-medium text-secondary-foreground"
        >
          Now
        </button>
      </div>
    </div>
  )
}
