import React from 'react'
import AtomText from '../atoms/text.atom'

interface MoleculeNominalBoxProps {
    label: string 
    value: number
}

const MoleculeNominalBox: React.FC<MoleculeNominalBoxProps> = ({ label, value }) => {
    return (
        <div className='bg-blue-500 gap-3 mb-5 p-3 rounded-lg'>
            <AtomText type='content' text={label}/>
            <AtomText type='sub-title-small' text={value.toLocaleString()}/>
        </div>
    )
}

export default MoleculeNominalBox