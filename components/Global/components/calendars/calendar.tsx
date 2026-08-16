"use client"

import * as React from "react"

const months = [
  "Janeiro",
  "Fevereiro",
  "Março",
  "Abril",
  "Maio",
  "Junho",
  "Julho",
  "Agosto",
  "Setembro",
  "Outubro",
  "Novembro",
  "Dezembro",
]

const weekDays = ["D", "S", "T", "Q", "Q", "S", "S"]

type DayType = "current" | "previous" | "next"

interface CalendarDay {
  day: number
  type: DayType
}

export default function Calendar() {
  const today = new Date()

  const [selectedDate, setSelectedDate] =
    React.useState<Date>(today)

  const [month, setMonth] = React.useState(
    today.getMonth()
  )

  const [year, setYear] = React.useState(
    today.getFullYear()
  )

  const days = React.useMemo(() => {
    const result: CalendarDay[] = []

    const firstDay = new Date(
      year,
      month,
      1
    ).getDay()

    const totalDays = new Date(
      year,
      month + 1,
      0
    ).getDate()

    const previousMonthTotal = new Date(
      year,
      month,
      0
    ).getDate()

    // Dias do mês anterior
    for (let i = firstDay - 1; i >= 0; i--) {
      result.push({
        day: previousMonthTotal - i,
        type: "previous",
      })
    }

    // Dias do mês atual
    for (let day = 1; day <= totalDays; day++) {
      result.push({
        day,
        type: "current",
      })
    }

    // Completa a última semana
    let nextDay = 1

    while (result.length % 7 !== 0) {
      result.push({
        day: nextDay,
        type: "next",
      })

      nextDay++
    }

    return result
  }, [month, year])

  function selectDay(
    day: number,
    type: DayType
  ) {
    if (type === "current") {
      setSelectedDate(
        new Date(year, month, day)
      )

      return
    }

    if (type === "previous") {
      const newDate = new Date(
        year,
        month - 1,
        day
      )

      setSelectedDate(newDate)
      setMonth(newDate.getMonth())
      setYear(newDate.getFullYear())

      return
    }

    const newDate = new Date(
      year,
      month + 1,
      day
    )

    setSelectedDate(newDate)
    setMonth(newDate.getMonth())
    setYear(newDate.getFullYear())
  }

  function isSelected(
    day: number,
    type: DayType
  ) {
    if (type !== "current") {
      return false
    }

    return (
      selectedDate.getDate() === day &&
      selectedDate.getMonth() === month &&
      selectedDate.getFullYear() === year
    )
  }

  return (
    <div
      className="
        w-[310px]
        rounded-xl
        border
        border-neutral-200
        bg-white
        p-4
        text-neutral-900
        shadow-sm
      "
    >
      {/* Mês e ano */}
      <div
        className="
          mb-4
          flex
          items-center
          justify-center
          gap-1
        "
      >
        {/* Mês */}
        <div className="relative flex items-center">
          <select
            value={month}
            onChange={(event) =>
              setMonth(
                Number(event.target.value)
              )
            }
            className="
              cursor-pointer
              appearance-none
              border-0
              bg-transparent
              py-1
              pl-1
              pr-6
              text-sm
              font-semibold
              outline-none
            "
          >
            {months.map(
              (monthName, index) => (
                <option
                  key={monthName}
                  value={index}
                >
                  {monthName}
                </option>
              )
            )}
          </select>

          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="
              pointer-events-none
              absolute
              right-1
              h-3.5
              w-3.5
              text-neutral-500
            "
          >
            <path
              d="m6 9 6 6 6-6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        {/* Ano */}
        <div className="relative flex items-center">
          <select
            value={year}
            onChange={(event) =>
              setYear(
                Number(event.target.value)
              )
            }
            className="
              cursor-pointer
              appearance-none
              border-0
              bg-transparent
              py-1
              pl-1
              pr-6
              text-sm
              font-semibold
              outline-none
            "
          >
            {Array.from(
              { length: 201 },
              (_, index) => 1900 + index
            ).map((yearValue) => (
              <option
                key={yearValue}
                value={yearValue}
              >
                {yearValue}
              </option>
            ))}
          </select>

          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="
              pointer-events-none
              absolute
              right-1
              h-3.5
              w-3.5
              text-neutral-500
            "
          >
            <path
              d="m6 9 6 6 6-6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>

      {/* Dias da semana */}
      <div className="grid grid-cols-7">
        {weekDays.map((day, index) => (
          <div
            key={`${day}-${index}`}
            className="
              flex
              h-8
              items-center
              justify-center
              text-xs
              font-medium
              text-neutral-400
            "
          >
            {day}
          </div>
        ))}
      </div>

      {/* Dias do calendário */}
      <div className="grid grid-cols-7 gap-1">
        {days.map((item, index) => {
          const selected = isSelected(
            item.day,
            item.type
          )

          return (
            <button
              key={`${item.type}-${item.day}-${index}`}
              type="button"
              onClick={() =>
                selectDay(
                  item.day,
                  item.type
                )
              }
              className={`
                flex
                h-9
                w-9
                items-center
                justify-center
                rounded-md
                border-0
                bg-transparent
                text-sm
                transition-colors

                ${
                  item.type === "current"
                    ? "text-neutral-800 hover:bg-neutral-100"
                    : "text-neutral-300 hover:bg-neutral-50"
                }

                ${
                  selected
                    ? "!bg-neutral-900 !text-white"
                    : ""
                }
              `}
            >
              {item.day}
            </button>
          )
        })}
      </div>

      {/* Data selecionada */}
      <div
        className="
          mt-4
          text-center
          text-xs
          text-neutral-500
        "
      >
        Selecionado:{" "}
        {selectedDate.toLocaleDateString(
          "pt-BR"
        )}
      </div>
    </div>
  )
}