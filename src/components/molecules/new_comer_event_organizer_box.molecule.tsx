import * as React from 'react'
import AtomText from '../atoms/text.atom';
import AtomDivider from '../atoms/divider.atom';
import { Button } from '../ui/button';
import Image from 'next/image';

interface IMoleculeNewComerEventOrganizerBoxProps {
}

const MoleculeNewComerEventOrganizerBox: React.FunctionComponent<IMoleculeNewComerEventOrganizerBoxProps> = () => {
    return (
        <div className='bg-gray-100 p-5 border border-gray-300 rounded-xl bg-white hover:shadow-lg text-center' style={{maxWidth:"280px"}}>
            <Image src={`/images/user.png`} alt={`/images/user.png`} width={60} height={60} className="object-cover rounded-full mx-auto mb-2"/>
            <AtomText type='content-title' text='EO A'/>
            <AtomText type='content' text='Lorem ipsum' extraClass='text-gray-400'/>
            <div className='flex flex-wrap gap-4 justify-center my-5'>
                <div>
                    <AtomText type='content-title' text='39' extraClass='mb-0 font-semibold'/>
                    <AtomText type='content' text='Event' extraClass='text-gray-400 mb-2'/>
                </div>
                <div>
                    <AtomText type='content-title' text='14500' extraClass='mb-0 font-semibold'/>
                    <AtomText type='content' text='Attendee' extraClass='text-gray-400 mb-2'/>
                </div>
            </div>
            <Button variant="default" className='w-full mb-1'>Visit</Button>
            <AtomText type='content' text={`Joined at 20 May 2016`} extraClass='text-gray-400 italic'/>
        </div>
    )
}

export default MoleculeNewComerEventOrganizerBox;