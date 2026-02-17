'use client'
import React, { useEffect, useState } from 'react'
import MoleculeIdentityBox from '../molecules/identity_box.molecule';
import { faCalendar, faCoins, faMoneyCheck, faPercentage, faStar, faUsers } from '@fortawesome/free-solid-svg-icons';
import { EventOrganizerSummaryResponse, getEventOrganizerSummary } from '@/repositories/r_stats';
import Skeleton from 'react-loading-skeleton';
import MoleculeNoDataBox from '../molecules/no_data_box.molecule';

interface IOrganismSummaryEventListProps {
    isFull: boolean
}

const OrganismSummaryEventList: React.FunctionComponent<IOrganismSummaryEventListProps> = ({ isFull = true }) => {
    const [item, setItem] = useState<EventOrganizerSummaryResponse>()
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const fetchEventOrganizerSummary = async () => {
            try {
                const data = await getEventOrganizerSummary()
                setItem(data)
            } catch (err: any) {
                setError(err?.response?.data?.message || "Something went wrong")
            } finally { 
                setLoading(false)
            }
        }

        fetchEventOrganizerSummary()
    }, [])

    if (loading) return <Skeleton style={{height:"400px"}}/>
    if (error || item === null) return <MoleculeNoDataBox title="No enough data to show" style={{height:"400px"}}/>

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className='bg-blue-100 p-5 pb-3 rounded-2xl flex items-center'>
                <MoleculeIdentityBox icon={faCalendar} label='Upcoming Event' value={item?.upcoming_event ?? '-'}/>
            </div>
            <div className='bg-orange-100 p-5 pb-3 rounded-2xl flex items-center'>
                <MoleculeIdentityBox icon={faUsers} label='Lifetime Attendee' value={item?.total_attendee.toString() ?? '0'} color='orange'/>
            </div>
            <div className='bg-green-100 p-5 pb-3 rounded-2xl flex items-center'>
                <MoleculeIdentityBox icon={faMoneyCheck} label='Transaction' value={item?.total_transaction.toString() ?? '0'} color='green'/>
            </div>
            {
                isFull && (
                    <>
                        <div className='bg-blue-100 p-5 pb-3 rounded-2xl flex items-center'>
                            <MoleculeIdentityBox icon={faCoins} label='Revenue' value={`Rp. ${item?.total_revenue.toLocaleString()}`}/>
                        </div>
                        <div className='bg-orange-100 p-5 pb-3 rounded-2xl flex items-center'>
                            <MoleculeIdentityBox icon={faPercentage} label='Revenue (After Discount Cut)' value={`Rp. ${item?.total_actual_revenue.toLocaleString()}`} color='orange'/>
                        </div>
                    </>
                )
            }
            <div className='bg-green-100 p-5 pb-3 rounded-2xl flex items-center'>
                <MoleculeIdentityBox icon={faStar} label='Average Rate' value={item?.average_review_rate.toString() ?? '-'} color='green'/>
            </div>
        </div>
    )
}

export default OrganismSummaryEventList;
