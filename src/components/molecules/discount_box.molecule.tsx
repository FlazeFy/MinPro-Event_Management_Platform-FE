import React from 'react'
import AtomText from '../atoms/text.atom'

interface MoleculeDiscountBoxProps {
    description: string
    percentage: number
    expiredAt: string
}

const MoleculeDiscountBox: React.FC<MoleculeDiscountBoxProps> = ({ description, percentage, expiredAt }) => {
    return (
        <div className='flex flex-wrap gap-2 items-center justify-between w-full rounded-2xl bg-gradient-to-r from-orange-200 via-orange-300 to-orange-400 p-8 shadow-sm'>
            <div>
                <AtomText text={description} type='content' extraClass='font-bold'/>
                <AtomText text={`Expired at ${expiredAt}`} type='content' extraClass='italic text-sm'/>
            </div>
            <AtomText text={`${percentage}%`} type='content' extraClass='font-bold text-2xl text-white'/>
        </div>
    )
}

export default MoleculeDiscountBox