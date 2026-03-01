"use client"
import * as React from "react"
import AtomText from "../atoms/text.atom"
import OrganismBookEventForm from "./book_event_form.organism"
import { Badge } from "../ui/badge"

interface IMoleculePriceBoxProps {
  eventOrganizerId: string
  price: number
  availableSeats: number
  totalSeats: number
}

const MoleculePriceBox: React.FunctionComponent<IMoleculePriceBoxProps> = ({ price, availableSeats, totalSeats, eventOrganizerId}) => {
  const percentage = React.useMemo(() => {
    if (!totalSeats) return 0
    const value = (availableSeats / totalSeats) * 100
    return Math.round(100 - Math.max(0, Math.min(100, value)))
  }, [availableSeats, totalSeats])

  const warningThreshold = 70

  return (
    <aside className="w-full rounded-3xl bg-white p-5 shadow-lg">
      <div className="mb-4 space-y-1">
        <AtomText type="sub-title-small" text="Ticket Price" extraClass="text-xs font-medium uppercase tracking-wide text-slate-500" />
        <div className="flex items-baseline gap-1">
          {
            price === 0 ? 
              <Badge className="py-1 px-3 text-sm bg-success">It's Free!</Badge>
            :
              <span className="text-3xl font-bold text-slate-900">Rp. {price.toFixed(2)}</span>
          }
          <span className="text-xs text-slate-400">/person</span>
        </div>
      </div>
      <div className="flex flex-col gap-2 rounded-xl bg-slate-50 p-4 shadow-sm">
        <div className="flex items-center justify-between text-xs font-medium uppercase tracking-wide text-slate-500">
          <AtomText type="content" text="Available Seats" extraClass="font-semibold text-slate-700" />
          <span className="text-xs font-semibold text-indigo-600">{availableSeats} / {totalSeats}</span>
        </div>
        <div className="h-2.5 w-full overflow-hidden rounded-full bg-slate-200">
          <div className={`h-full rounded-full bg-${percentage < warningThreshold ? 'indigo' : 'red' }-500 transition-all`} style={{ width: `${percentage}%` }}/>
        </div>
        <div className="mt-1 flex items-center gap-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-400">
          <span>{percentage}% booked</span>
          {
            percentage === 100 ? 
              <span className="text-red-500">• Full Booked!</span>
            : percentage > warningThreshold ?
              <span className="text-orange-500">• Hurry up!</span>
            :
              <></>
          }
        </div>
      </div>
      <div className="mt-5 flex flex-col gap-3">
        <OrganismBookEventForm eventOrganizerId={eventOrganizerId} unitPrice={price} isFree={price === 0 ? true : false}/>
      </div>
    </aside>
  )
}

export default MoleculePriceBox
