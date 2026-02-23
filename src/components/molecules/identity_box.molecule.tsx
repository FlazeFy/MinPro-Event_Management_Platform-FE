import React from 'react'
import AtomText from '../atoms/text.atom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

interface MoleculeIdentityBoxProps {
    label: string 
    value: string 
    icon: any
    color?: string
}

const MoleculeIdentityBox: React.FC<MoleculeIdentityBoxProps> = ({ label, value, icon, color = 'blue' }) => {
    const colorMap: Record<string, string> = {
        blue: 'bg-blue-500',
        orange: 'bg-orange-500',
        green: 'bg-green-500',
    }

    return (
        <div className='flex gap-3 mb-3 items-center'>
            <div className={`${colorMap[color]} rounded-lg text-white p-3`}>
                <FontAwesomeIcon icon={icon}/>
            </div>
            <div className='flex flex-col'>
                <AtomText type='label' text={label}/>
                <AtomText type='content' text={value}/>
            </div>
        </div>
    )
}

export default MoleculeIdentityBox