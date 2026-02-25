'use client'
import React from 'react'
import AtomText from '../atoms/text.atom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface IMoleculeTrendingEventOrganizerListProps {
    icon: any
    label: string 
    val: string
    color: string
}

const MoleculeTrendingEventOrganizerBox: React.FunctionComponent<IMoleculeTrendingEventOrganizerListProps> = ({ icon, label, val, color }) => {
    return (
        <div className='flex gap-2 mt-3 items-center'>
            <div className={`bg-${color}-300 border-2 border-white p-3 rounded-xl text-black`}><FontAwesomeIcon icon={icon}/></div>
            <div>
                <AtomText type='content' text={label}/>
                <AtomText type='content-title' text={val}/>
            </div>
        </div>
    )
}

export default MoleculeTrendingEventOrganizerBox;
