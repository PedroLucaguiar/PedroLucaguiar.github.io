"use client"

import * as React from "react"

interface SwitchProps {
  checked?: boolean
  defaultChecked?: boolean
  onChange?: (checked: boolean) => void
}

export default function Switch({
  checked,
  defaultChecked = false,
  onChange,
}: SwitchProps) {
  const [internalChecked, setInternalChecked] =
    React.useState(defaultChecked)

  const isControlled = checked !== undefined
  const isChecked = isControlled ? checked : internalChecked

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const newValue = event.target.checked

    if (!isControlled) {
      setInternalChecked(newValue)
    }

    onChange?.(newValue)
  }

  return (
    <>
      <style>{`
        .custom-switch {
          display: inline-flex;
          align-items: center;
          cursor: pointer;
          -webkit-tap-highlight-color: transparent;
        }

        .custom-switch-input {
          display: none;
        }

        .custom-switch-slider {
          width: 60px;
          height: 30px;

          display: flex;
          align-items: center;

          overflow: hidden;

          border: 4px solid transparent;
          border-radius: 20px;

          background-color: lightgray;

          cursor: pointer;

          box-shadow:
            0 0 10px 0
            rgba(0, 0, 0, 0.25)
            inset;

          transition: 0.3s;
        }

        .custom-switch-slider::before {
          content: "";

          display: block;

          width: 100%;
          height: 100%;

          border-radius: 20px;

          background-color: #ffffff;

          transform: translateX(-30px);

          box-shadow:
            0 0 10px 3px
            rgba(0, 0, 0, 0.25);

          transition: 0.3s;
        }

        .custom-switch-input:checked
        ~ .custom-switch-slider {
          background-color: #2196f3;
        }

        .custom-switch-input:checked
        ~ .custom-switch-slider::before {
          transform: translateX(30px);

          box-shadow:
            0 0 10px 3px
            rgba(0, 0, 0, 0.25);
        }

        .custom-switch-input:active
        ~ .custom-switch-slider::before {
          transform: translateX(0);
        }
      `}</style>

      <label className="custom-switch">
        <input
          type="checkbox"
          className="custom-switch-input"
          checked={isChecked}
          onChange={handleChange}
        />

        <div className="custom-switch-slider" />
      </label>
    </>
  )
}