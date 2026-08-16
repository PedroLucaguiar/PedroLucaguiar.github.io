"use client"

import * as React from "react"

type DateRange = {
  from?: Date
  to?: Date
}

const monthNames = [
  "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
  "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro",
]

const weekDays = ["D", "S", "T", "Q", "Q", "S", "S"]

function addDays(date: Date, amount: number) {
  const copy = new Date(date)
  copy.setDate(copy.getDate() + amount)
  return copy
}

function sameDay(a?: Date, b?: Date) {
  if (!a || !b) return false
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  )
}

function dayValue(date: Date) {
  return new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate()
  ).getTime()
}

function between(date: Date, from?: Date, to?: Date) {
  if (!from || !to) return false
  const value = dayValue(date)
  return value > dayValue(from) && value < dayValue(to)
}

function getMonthDays(year: number, month: number) {
  const firstDay = new Date(year, month, 1)
  const lastDay = new Date(year, month + 1, 0)

  const result: { date: Date; outside: boolean }[] = []

  for (let i = firstDay.getDay(); i > 0; i--) {
    result.push({
      date: new Date(year, month, 1 - i),
      outside: true,
    })
  }

  for (let day = 1; day <= lastDay.getDate(); day++) {
    result.push({
      date: new Date(year, month, day),
      outside: false,
    })
  }

  let next = 1
  while (result.length < 42) {
    result.push({
      date: new Date(year, month + 1, next++),
      outside: true,
    })
  }

  return result
}

function CalendarBox({
  month,
  range,
  onSelect,
  onPrevious,
  onNext,
}: {
  month: Date
  range: DateRange
  onSelect: (date: Date) => void
  onPrevious: () => void
  onNext: () => void
}) {
  const days = getMonthDays(month.getFullYear(), month.getMonth())

  return (
    <div className="cal-box">
      <div className="cal-head">
        <button
          type="button"
          className="cal-nav"
          onClick={onPrevious}
          aria-label="Mês anterior"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="m15 18-6-6 6-6" />
          </svg>
        </button>

        <div className="cal-title">
          {monthNames[month.getMonth()]} {month.getFullYear()}
        </div>

        <button
          type="button"
          className="cal-nav"
          onClick={onNext}
          aria-label="Próximo mês"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="m9 18 6-6-6-6" />
          </svg>
        </button>
      </div>

      <div className="week-grid">
        {weekDays.map((day, index) => (
          <div key={`${day}-${index}`} className="week-day">
            {day}
          </div>
        ))}
      </div>

      <div className="day-grid">
        {days.map(({ date, outside }, index) => {
          const isStart = sameDay(date, range.from)
          const isEnd = sameDay(date, range.to)
          const isMiddle = between(date, range.from, range.to)

          return (
            <button
              type="button"
              key={`${date.toISOString()}-${index}`}
              onClick={() => onSelect(date)}
              className={[
                "day",
                outside ? "outside" : "",
                isMiddle ? "middle" : "",
                isStart ? "start" : "",
                isEnd ? "end" : "",
              ].filter(Boolean).join(" ")}
            >
              {date.getDate()}
            </button>
          )
        })}
      </div>
    </div>
  )
}

export default function CalendarRange() {
  const now = new Date()
  const initialFrom = new Date(now.getFullYear(), 0, 12)

  const [range, setRange] = React.useState<DateRange>({
    from: initialFrom,
    to: addDays(initialFrom, 30),
  })

  // Dois calendários separados, lado a lado
  const [leftMonth, setLeftMonth] = React.useState(
    new Date(initialFrom.getFullYear(), initialFrom.getMonth(), 1)
  )

  const [rightMonth, setRightMonth] = React.useState(
    new Date(initialFrom.getFullYear(), initialFrom.getMonth() + 1, 1)
  )

  function selectDate(date: Date) {
    if (!range.from || range.to) {
      setRange({ from: date, to: undefined })
      return
    }

    if (dayValue(date) < dayValue(range.from)) {
      setRange({ from: date, to: range.from })
      return
    }

    setRange({ from: range.from, to: date })
  }

  return (
    <>
      <style>{`
        .calendar-range-wrap {
          display: flex;
          gap: 12px;
          align-items: flex-start;
          font-family: Inter, ui-sans-serif, system-ui, -apple-system, sans-serif;
        }

        .cal-box {
          width: 310px;
          padding: 14px;
          border: 1px solid #e5e7eb;
          border-radius: 10px;
          background: #fff;
          color: #171717;
          box-shadow: 0 1px 3px rgba(0,0,0,.04);
        }

        .cal-head {
          height: 36px;
          display: grid;
          grid-template-columns: 36px 1fr 36px;
          align-items: center;
          margin-bottom: 10px;
        }

        .cal-title {
          text-align: center;
          font-size: 14px;
          font-weight: 600;
        }

        .cal-nav {
          width: 32px;
          height: 32px;
          display: grid;
          place-items: center;
          border: 0;
          border-radius: 7px;
          background: transparent;
          color: #525252;
          cursor: pointer;
        }

        .cal-nav:hover {
          background: #f5f5f5;
        }

        .cal-nav svg {
          width: 16px;
          height: 16px;
        }

        .week-grid,
        .day-grid {
          display: grid;
          grid-template-columns: repeat(7, 40px);
        }

        .week-day {
          height: 32px;
          display: grid;
          place-items: center;
          font-size: 12px;
          color: #a3a3a3;
        }

        .day {
          position: relative;
          width: 40px;
          height: 38px;
          border: 0;
          background: transparent;
          color: #262626;
          font-size: 13px;
          cursor: pointer;
          z-index: 1;
        }

        .day::before {
          content: "";
          position: absolute;
          inset: 2px;
          border-radius: 7px;
          z-index: -1;
        }

        .day:hover::before {
          background: #f5f5f5;
        }

        .outside {
          color: #d4d4d4;
        }

        .middle {
          background: #f1f5f9;
        }

        .start,
        .end {
          color: #fff;
          font-weight: 600;
        }

        .start::before,
        .end::before {
          background: #171717 !important;
        }

        @media (max-width: 700px) {
          .calendar-range-wrap {
            flex-direction: column;
          }
        }
      `}</style>

      <div className="calendar-range-wrap">
        <CalendarBox
          month={leftMonth}
          range={range}
          onSelect={selectDate}
          onPrevious={() =>
            setLeftMonth(
              new Date(
                leftMonth.getFullYear(),
                leftMonth.getMonth() - 1,
                1
              )
            )
          }
          onNext={() =>
            setLeftMonth(
              new Date(
                leftMonth.getFullYear(),
                leftMonth.getMonth() + 1,
                1
              )
            )
          }
        />

        <CalendarBox
          month={rightMonth}
          range={range}
          onSelect={selectDate}
          onPrevious={() =>
            setRightMonth(
              new Date(
                rightMonth.getFullYear(),
                rightMonth.getMonth() - 1,
                1
              )
            )
          }
          onNext={() =>
            setRightMonth(
              new Date(
                rightMonth.getFullYear(),
                rightMonth.getMonth() + 1,
                1
              )
            )
          }
        />
      </div>
    </>
  )
}