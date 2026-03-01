import React from 'react'
import AtomText from '../atoms/text.atom'
import { convertUTCToLocal } from '@/helpers/converter.helper'

interface MoleculeDiscountBoxProps {
    description: string
    percentage: number
    expiredAt: string | null
    role: string
    action?: () => void
    selected?: boolean
}

const MoleculeDiscountBox: React.FC<MoleculeDiscountBoxProps> = ({ description, percentage, expiredAt, role, action, selected }) => {
    const isClickable = !!action

    const bgClass = isClickable ? selected ? "bg-gradient-to-r from-green-400 via-green-500 to-green-600"
        : "bg-gradient-to-r from-orange-200 via-orange-300 to-orange-400"
        : "bg-gradient-to-r from-orange-200 via-orange-300 to-orange-400"

    return (
        <div onClick={isClickable ? action : undefined} className={`flex flex-wrap gap-2 items-center justify-between w-full rounded-2xl ${bgClass} p-5 shadow-sm transition-all duration-300 ease-out mb-3 ${isClickable ? "cursor-pointer hover:shadow-lg hover:scale-[1.03] hover:shadow-2xl" : ""}`}>
            <div>
                <AtomText text={description} type='content' extraClass='font-bold'/>
                {expiredAt && <AtomText text={`Expired at ${convertUTCToLocal(expiredAt)}`} type='content' extraClass='italic text-sm'/>}
            </div>
            <AtomText text={`${percentage}%`} type='content' extraClass='font-bold text-2xl text-white'/>
        </div>
    )
}

export default MoleculeDiscountBox