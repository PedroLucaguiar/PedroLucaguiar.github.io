"use client"

import React from "react"

export const CheckboxHero = () => {
  const [checked, setChecked] = React.useState(false)

  return (
    <div className="flex justify-center">
      <label className="inline-flex items-center gap-2 text-sm text-foreground">
        <input
          type="checkbox"
          checked={checked}
          onChange={(event) => setChecked(event.target.checked)}
          className="h-4 w-4 rounded border-border accent-primary"
        />
        Checkbox
      </label>
    </div>
  )
}
