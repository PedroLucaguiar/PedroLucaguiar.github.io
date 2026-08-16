"use client"

import React from "react"

export const DateRangePickerTimeExample = () => {
  const [from, setFrom] = React.useState("")
  const [to, setTo] = React.useState("")

  return (
    <div className="mx-auto flex max-w-sm flex-col gap-2">
      <p className="text-gray-500">
        {from || to ? `${from || "Start"} - ${to || "End"}` : "Select a date range"}
      </p>
      <div className="grid gap-2 sm:grid-cols-2">
        <input
          type="datetime-local"
          value={from}
          onChange={(event) => setFrom(event.target.value)}
          className="h-10 rounded-md border border-border bg-background px-3 text-sm text-foreground outline-none focus:border-primary/60"
        />
        <input
          type="datetime-local"
          value={to}
          onChange={(event) => setTo(event.target.value)}
          className="h-10 rounded-md border border-border bg-background px-3 text-sm text-foreground outline-none focus:border-primary/60"
        />
      </div>
      <div className="flex justify-end gap-2">
        <button
          type="button"
          onClick={() => {
            setFrom("")
            setTo("")
          }}
          className="h-9 rounded-md bg-destructive px-3 text-sm font-medium text-destructive-foreground"
        >
          Reset
        </button>
        <button
          type="button"
          onClick={() => {
            const end = new Date()
            const start = new Date()
            start.setDate(end.getDate() - 7)
            setFrom(start.toISOString().slice(0, 16))
            setTo(end.toISOString().slice(0, 16))
          }}
          className="h-9 rounded-md bg-secondary px-3 text-sm font-medium text-secondary-foreground"
        >
          Week
        </button>
      </div>
    </div>
  )
}
