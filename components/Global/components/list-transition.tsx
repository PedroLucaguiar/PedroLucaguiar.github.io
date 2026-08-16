"use client"

import { useState } from "react"
import { Check, Plus, RepeatIcon, Settings2Icon, Trash2, XIcon } from "lucide-react"
import { cn } from "../utils"

interface Item {
  text: string
  checked: boolean
  id: number
  description: string
}

const initialState: Item[] = [
  {
    text: "Gather Data",
    checked: false,
    id: 1,
    description: "Collect relevant data and context before starting the workflow.",
  },
  {
    text: "Analyze Copy",
    checked: false,
    id: 2,
    description: "Review the available information and identify opportunities for improvement.",
  },
  {
    text: "Create Suggestions",
    checked: false,
    id: 3,
    description: "Create practical suggestions based on the analysis.",
  },
  {
    text: "Recommendations",
    checked: false,
    id: 5,
    description: "Present recommendations and next actions clearly.",
  },
]

function SortableListDemo() {
  const [items, setItems] = useState<Item[]>(initialState)
  const [openItemId, setOpenItemId] = useState<number | null>(null)

  function toggleItem(id: number) {
    setItems((current) =>
      current.map((item) => (item.id === id ? { ...item, checked: !item.checked } : item)),
    )
  }

  function removeItem(id: number) {
    setItems((current) => current.filter((item) => item.id !== id))
  }

  function updateItem(id: number, patch: Partial<Item>) {
    setItems((current) => current.map((item) => (item.id === id ? { ...item, ...patch } : item)))
  }

  function addItem() {
    setItems((current) => [
      ...current,
      {
        text: `Item ${current.length + 1}`,
        checked: false,
        id: Date.now(),
        description: "",
      },
    ])
  }

  return (
    <div className="w-full max-w-xl md:px-4">
      <div className="rounded-2xl bg-black p-3 shadow-sm md:p-6">
        <div className="flex flex-col gap-4">
          <div>
            <h3 className="text-lg font-semibold text-neutral-100">Agent workflow</h3>
            <p className="text-xs text-neutral-400">Reusable animated-looking task list without external UI dependencies.</p>
          </div>

          <div className="flex items-center justify-between gap-4">
            <button
              type="button"
              disabled={items.length > 5}
              onClick={addItem}
              className="rounded-lg p-2 text-neutral-400 transition hover:bg-white/10 hover:text-white disabled:opacity-40"
            >
              <Plus className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={() => {
                setItems(initialState)
                setOpenItemId(null)
              }}
              className="rounded-lg p-2 text-neutral-400 transition hover:bg-white/10 hover:text-white"
            >
              <RepeatIcon className="h-4 w-4" />
            </button>
          </div>

          <div className="space-y-2">
            {items.map((item, index) => {
              const open = openItemId === item.id
              return (
                <div
                  key={item.id}
                  className={cn(
                    "overflow-hidden rounded-xl border border-white/10 bg-neutral-900/80 text-white transition-all duration-200",
                    open && "bg-neutral-900 shadow-lg shadow-black/30",
                  )}
                >
                  <div className="flex items-center gap-3 p-3">
                    <button
                      type="button"
                      onClick={() => toggleItem(item.id)}
                      className={cn(
                        "flex h-7 w-7 shrink-0 items-center justify-center rounded-full border transition",
                        item.checked ? "border-emerald-400 bg-emerald-400 text-black" : "border-white/15 text-neutral-500",
                      )}
                    >
                      {item.checked ? <Check className="h-4 w-4" /> : index + 1}
                    </button>

                    <span className={cn("min-w-0 flex-1 truncate font-medium", item.checked && "text-neutral-500 line-through")}>
                      {item.text}
                    </span>

                    <button
                      type="button"
                      onClick={() => setOpenItemId(open ? null : item.id)}
                      className="rounded-lg p-2 text-neutral-400 transition hover:bg-white/10 hover:text-white"
                    >
                      {open ? <XIcon className="h-4 w-4" /> : <Settings2Icon className="h-4 w-4" />}
                    </button>
                    <button
                      type="button"
                      onClick={() => removeItem(item.id)}
                      className="rounded-lg p-2 text-neutral-500 transition hover:bg-red-500/10 hover:text-red-300"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>

                  {open ? (
                    <div className="grid gap-3 border-t border-white/10 p-3">
                      <label className="grid gap-1 text-xs text-neutral-400">
                        Title
                        <input
                          value={item.text}
                          onChange={(event) => updateItem(item.id, { text: event.target.value })}
                          className="h-9 rounded-lg border border-white/10 bg-neutral-800 px-3 text-sm text-white outline-none focus:border-cyan-300/70"
                        />
                      </label>
                      <label className="grid gap-1 text-xs text-neutral-400">
                        Prompt
                        <textarea
                          value={item.description}
                          onChange={(event) => updateItem(item.id, { description: event.target.value })}
                          className="h-24 resize-none rounded-lg border border-white/10 bg-neutral-800 px-3 py-2 text-sm text-white outline-none focus:border-cyan-300/70"
                        />
                      </label>
                    </div>
                  ) : null}
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

export default SortableListDemo
