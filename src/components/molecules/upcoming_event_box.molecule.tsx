import * as React from 'react'
import AtomText from '../atoms/text.atom';
import { Button } from '../ui/button';
import AtomDivider from '../atoms/divider.atom';
import { Badge } from '../ui/badge';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faClock, faCoins, faExpand, faUsers } from '@fortawesome/free-solid-svg-icons';

interface IMoleculeUpcomingEventBoxProps {
    item: any
    role: string
}

const MoleculeUpcomingEventBox: React.FunctionComponent<IMoleculeUpcomingEventBoxProps> = ({ item, role }) => {
    return (
        <div className='bg-gray-100 p-5 border border-gray-300 rounded-xl bg-white hover:shadow-lg hover:cursor-pointer'>
            <div className='flex flex-wrap gap-3 items-center'>
                <div>
                    <div className='text-center bg-green-200 p-3 rounded-xl'>
                        <AtomText type='content' text='Sat'/>
                        <AtomText type='content' text='19 Mar'/>
                    </div>
                </div>
                <div>
                    <AtomText type='content-title' text='Event A' extraClass='mb-2'/>
                    <div className='flex flex-wrap gap-2'>
                        <Badge>Concert</Badge>
                        <div className='flex flex-wrap gap-1 items-center'>
                            <FontAwesomeIcon icon={faClock}/>
                            <AtomText type='content' text='09:00 AM - 01:00 PM'/>
                        </div>
                    </div>
                </div>
            </div>
            <AtomDivider/>
            {
                role === "event_organizer" ? 
                    <div className='flex flex-wrap gap-2 justify-between'>
                        <div className='flex flex-wrap gap-5'>
                            <div className='flex flex-wrap gap-1 items-center'>
                                <FontAwesomeIcon icon={faUsers}/>
                                <AtomText type='content' text='10'/>
                            </div>
                            <div className='flex flex-wrap gap-1 items-center'>
                                <FontAwesomeIcon icon={faCoins}/>
                                <AtomText type='content' text='Rp. 100.000'/>
                            </div>
                        </div>
                        <Button><FontAwesomeIcon icon={faArrowRight}/>Manage</Button>
                    </div>
                :
                    <>
                        <AtomText type='content' text='Booked For' extraClass='font-semibold'/>
                        <div className='flex flex-wrap gap-2 mt-1'>
                            <Badge variant='outline'>Audrey</Badge><Badge variant='outline'>Bobby</Badge>
                        </div>
                    </>
            }
        </div>
    )
}

export default MoleculeUpcomingEventBox;
