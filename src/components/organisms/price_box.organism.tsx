"use client"
import * as React from "react"
import AtomText from "../atoms/text.atom"
import { Button } from "../ui/button"
import MoleculePriceBox from "../molecules/price_box.molecule"
import OrganismBookEventForm from "./book_event_form.organism"

interface IOrganismPriceBoxProps {
  price: number
  availableSeats: number
  totalSeats: number
}

const OrganismPriceBox: React.FunctionComponent<IOrganismPriceBoxProps> = ({price, availableSeats,totalSeats}) => {
  return (
    <aside className="w-full max-w-sm rounded-3xl bg-white p-6 shadow-lg">
      <div className="mb-4 space-y-1">
        <AtomText type="sub-title-small" text="Ticket Price" extraClass="text-xs font-medium uppercase tracking-wide text-slate-500" />
        <div className="flex items-baseline gap-1">
          <span className="text-3xl font-bold text-slate-900">Rp. {price.toFixed(2)}</span>
          <span className="text-xs text-slate-400">/person</span>
        </div>
      </div>
      <MoleculePriceBox availableSeats={availableSeats} totalSeats={totalSeats} />
      <div className="mt-5 flex flex-col gap-3">
        <OrganismBookEventForm/>
      </div>
    </aside>
  )
}

export default OrganismPriceBox
