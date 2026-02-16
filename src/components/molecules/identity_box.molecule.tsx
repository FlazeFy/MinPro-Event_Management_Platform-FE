import React from 'react'
import AtomText from '../atoms/text.atom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

interface MoleculeIdentityBoxProps {
    label: string 
    value: string 
    icon: any
}

const MoleculeIdentityBox: React.FC<MoleculeIdentityBoxProps> = ({ label, value, icon }) => {
    return (
        <div className='flex gap-3 mb-3'>
            <div className='bg-blue-500 rounded-lg text-white p-3'>
                <FontAwesomeIcon icon={icon}/>
            </div>
            <div>
                <AtomText type='label' text={label}/>
                <AtomText type='content' text={value}/>
            </div>
        </div>
    )
}

export default MoleculeIdentityBox