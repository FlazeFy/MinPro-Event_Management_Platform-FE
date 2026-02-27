"use client"
import * as React from "react"
import AtomText from "../atoms/text.atom"
import { Button } from "../ui/button"
import MoleculePriceBox from "../molecules/price_box.molecule"

interface IOrganismPriceBoxProps {
  price: number
  currency?: string
  unit?: string
  availableSeats: number
  totalSeats: number
}

const OrganismPriceBox: React.FunctionComponent<IOrganismPriceBoxProps> = ({
  price,
  currency = "$",
  unit = "/ person",
  availableSeats,
  totalSeats,
}) => {
  return (
    <aside className="w-full max-w-sm rounded-3xl bg-white p-6 shadow-lg">
      <div className="mb-4 space-y-1">
        <AtomText type="sub-title-small" text="Ticket Price" extraClass="text-xs font-medium uppercase tracking-wide text-slate-500" />
        <div className="flex items-baseline gap-1">
          <span className="text-3xl font-bold text-slate-900">{currency}{price.toFixed(2)}</span>
          <span className="text-xs text-slate-400">{unit}</span>
        </div>
      </div>

      <MoleculePriceBox availableSeats={availableSeats} totalSeats={totalSeats} />

      <div className="mt-5 flex flex-col gap-3">
        <Button className="h-11 rounded-full bg-indigo-600 text-sm font-semibold text-white hover:bg-indigo-700">
          Book Tickets Now
        </Button>
        <button className="flex h-11 items-center justify-center gap-2 rounded-full border border-slate-200 text-xs font-medium text-slate-700 hover:bg-slate-50">
          <span className="inline-flex h-4 w-4 items-center justify-center rounded-full border border-slate-400 text-[10px]">
            ♡
          </span>
          Save to Wishlist
        </button>
      </div>
    </aside>
  )
}

export default OrganismPriceBox
