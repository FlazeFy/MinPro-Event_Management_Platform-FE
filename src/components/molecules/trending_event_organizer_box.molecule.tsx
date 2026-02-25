'use client'
import React from 'react'
import AtomText from '../atoms/text.atom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';

interface IMoleculeTrendingEventOrganizerListProps {
    icon: any
    label: string 
    val: string
    subval: string
    color: string
    id: string
}

const MoleculeTrendingEventOrganizerBox: React.FunctionComponent<IMoleculeTrendingEventOrganizerListProps> = ({ icon, label, val, subval, color, id }) => {
    return (
        <Link href={`/event_organizer/${id}`}>
            <div className='flex gap-3 mt-4 items-center cursor-pointer'>
                <div className={`bg-${color}-300 border-2 border-white p-3 rounded-xl text-black`}><FontAwesomeIcon icon={icon}/></div>
                <div className='w-full'>
                    <AtomText type='content' text={label}/>
                    <hr className='mt-2 mb-1'/>
                    <AtomText type='content-title' text={val}/>
                    <AtomText type='content' text={subval}/>
                </div>
            </div>
        </Link>
    )
}

export default MoleculeTrendingEventOrganizerBox;
