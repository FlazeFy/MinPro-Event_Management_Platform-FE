import * as React from 'react'
import AtomText from '../atoms/text.atom';
import { Button } from '../ui/button';
import AtomDivider from '../atoms/divider.atom';
import { Badge } from '../ui/badge';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faClock, faCoins, faExpand, faUsers } from '@fortawesome/free-solid-svg-icons';
import { UpcomingEventItem } from '@/repositories/r_event';
import Link from 'next/link';
import { Role } from '@/store/s_auth';

interface IMoleculeUpcomingEventBoxProps {
    item: UpcomingEventItem
    role: Role
}

const MoleculeUpcomingEventBox: React.FunctionComponent<IMoleculeUpcomingEventBoxProps> = ({ item, role }) => {
    const startDate = new Date(item.start_date) 
    const endDate = new Date(item.end_date) 
    const dayName = startDate.toLocaleDateString('en-US', { weekday: 'short' }) 
    const dayMonth = startDate.toLocaleDateString('en-US', { day: '2-digit', month: 'short' })
    const startTime = startDate.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true })
    const endTime = endDate.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true })

    return (
        <Link href={`/event/${item.event.id}`}>
            <div className='bg-gray-100 p-5 border border-gray-300 rounded-xl bg-white hover:shadow-lg hover:cursor-pointer'>
                <div className='flex flex-wrap gap-3 items-center'>
                    <div>
                        <div className='text-center bg-green-200 p-3 rounded-xl'>
                            <AtomText type='content' text={dayName} extraClass='font-semibold'/>
                            <AtomText type='content' text={dayMonth}/>
                        </div>
                    </div>
                    <div>
                        <AtomText type='content-title' text={item.event.event_title} extraClass='mb-2'/>
                        <div className='flex flex-wrap gap-2'>
                            <Badge className='capitalize'>{item.event.event_category.replaceAll('_',' ')}</Badge>
                            <div className='flex flex-wrap gap-1 items-center'>
                                <FontAwesomeIcon icon={faClock}/>
                                <AtomText type='content' text={`${startTime} - ${endTime}`}/>
                            </div>
                        </div>
                    </div>
                </div>
                <AtomDivider/>
                {
                    role === "event_organizer" ? 
                        <div className='flex flex-wrap gap-2 justify-between'>
                            <div className='flex flex-wrap gap-5'>
                                <div className='flex flex-wrap gap-1 items-center' title='Remaining Seat'>
                                    <FontAwesomeIcon icon={faUsers}/>
                                    <AtomText type='content' text={item.event.total_seat_remaining}/>
                                </div>
                                <div className='flex flex-wrap gap-1 items-center' title='Total Profit'>
                                    <FontAwesomeIcon icon={faCoins}/>
                                    <AtomText type='content' text={`Rp. ${item.event.total_profit.toLocaleString()}`}/>
                                </div>
                            </div>
                            <Button><FontAwesomeIcon icon={faArrowRight}/>Manage</Button>
                        </div>
                    :
                        <>
                            <AtomText type='content' text='Booked For' extraClass='font-semibold'/>
                            <div className='flex flex-wrap gap-2 mt-1'>
                                {
                                    role === "customer" && 
                                        item.event.transactions.map((dt, idx) => (
                                            dt.attendees.map((at, idy) => <Badge variant='outline'>{at.fullname}</Badge>)
                                        ))
                                }
                            </div>
                        </>
                }
            </div>
        </Link>
    )
}

export default MoleculeUpcomingEventBox;