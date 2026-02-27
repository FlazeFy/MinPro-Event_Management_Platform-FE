import * as React from "react"
import AtomText from "../atoms/text.atom"

interface IMoleculePriceBoxProps {
  title?: string
  availableSeats: number
  totalSeats: number
}

const MoleculePriceBox: React.FunctionComponent<IMoleculePriceBoxProps> = ({title = "Available Seats", availableSeats, totalSeats}) => {
  const percentage = React.useMemo(() => {
    if (!totalSeats) return 0
    const value = (availableSeats / totalSeats) * 100
    return Math.max(0, Math.min(100, value))
  }, [availableSeats, totalSeats])

  const bookedPercentage = React.useMemo(() => {
    if (!totalSeats) return 0
    const value = ((totalSeats - availableSeats) / totalSeats) * 100
    return Math.max(0, Math.min(100, Math.round(value)))
  }, [availableSeats, totalSeats])

  return (
    <div className="flex flex-col gap-2 rounded-xl bg-slate-50 p-4 shadow-sm">
      <div className="flex items-center justify-between text-xs font-medium uppercase tracking-wide text-slate-500">
        <AtomText type="content" text={title} extraClass="font-semibold text-slate-700" />
        <span className="text-xs font-semibold text-indigo-600">
          {availableSeats} / {totalSeats}
        </span>
      </div>

      <div className="h-2.5 w-full overflow-hidden rounded-full bg-slate-200">
        <div
          className="h-full rounded-full bg-indigo-500 transition-all"
          style={{ width: `${percentage}%` }}
        />
      </div>

      <div className="mt-1 flex items-center gap-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-400">
        <span>{bookedPercentage}% booked</span>
        {bookedPercentage >= 70 && <span className="text-indigo-500">• Hurry up!</span>}
      </div>
    </div>
  )
}

export default MoleculePriceBox
