import React from 'react'
import AtomText from '../atoms/text.atom'
import { VenueData } from '@/repositories/template'

interface MoleculeVenueBoxProps {
    venue: VenueData
    action?: () => void
    selected?: boolean
}

const MoleculeVenueBox: React.FC<MoleculeVenueBoxProps> = ({ venue, action, selected }) => {
    const isClickable = !!action
    const borderClass = selected ? "border-2 border-green-400" : "border border-gray-200"

    return (
        <div onClick={isClickable ? action : undefined} 
            className={`flex flex-col w-full rounded-2xl bg-white ${borderClass} p-3 shadow-sm transition-all duration-300 ease-out mb-3 ${
                isClickable ? "cursor-pointer hover:shadow-lg hover:scale-[1.03]" : ""
            }`}>
            <AtomText text={venue.venue_name} type='content' extraClass='font-semibold text-md'/>
            <AtomText text={venue.venue_address} type='content' extraClass='text-sm italic text-gray-400'/>
        </div>
    )
}

export default MoleculeVenueBox