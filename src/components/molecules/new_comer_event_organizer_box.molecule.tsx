import * as React from 'react'
import AtomText from '../atoms/text.atom';
import { Button } from '../ui/button';
import Image from 'next/image';
import { NewComerEventOrganizerItem } from '@/repositories/r_event_organizer';
import { convertUTCToLocal } from '@/helpers/converter.helper';

interface IMoleculeNewComerEventOrganizerBoxProps {
    item: NewComerEventOrganizerItem
}

const MoleculeNewComerEventOrganizerBox: React.FunctionComponent<IMoleculeNewComerEventOrganizerBoxProps> = ({ item }) => {
    return (
        <div className="bg-gray-100 p-5 border border-gray-300 rounded-xl bg-white hover:shadow-lg text-center w-[280px] flex-shrink-0">
            <Image src={item.profile_pic ?? `/images/user.png`} alt={item.profile_pic ?? `/images/user.png`} width={60} height={60} className="object-cover rounded-full mx-auto mb-2"/>
            <AtomText type='content-title' text={item.organizer_name}/>
            <AtomText type='content' text={item.bio} extraClass='text-gray-400 line-clamp-2'/>
            <div className='flex flex-wrap gap-4 justify-center my-3'>
                <div>
                    <AtomText type='content-title' text={item.total_event} extraClass='mb-0 font-semibold'/>
                    <AtomText type='content' text='Event' extraClass='text-gray-400 mb-2'/>
                </div>
                <div>
                    <AtomText type='content-title' text={item.total_attendee} extraClass='mb-0 font-semibold'/>
                    <AtomText type='content' text='Attendee' extraClass='text-gray-400 mb-2'/>
                </div>
            </div>
            <Button variant="default" className='w-full mb-2'>Visit</Button>
            <AtomText type='content' text={`Joined at ${convertUTCToLocal(item.created_at)}`} extraClass='italic'/>
        </div>
    )
}

export default MoleculeNewComerEventOrganizerBox;