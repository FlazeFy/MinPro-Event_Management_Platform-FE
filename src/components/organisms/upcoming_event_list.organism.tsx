'use client'
import React, { useState, useEffect } from 'react'
import AtomText from '../atoms/text.atom';
import MoleculeUpcomingEventBox from '../molecules/upcoming_event_box.molecule';
import { getUpcomingEventRepo, UpcomingEventItem } from '@/repositories/r_event';
import Skeleton from 'react-loading-skeleton';
import MoleculeNoDataBox from '../molecules/no_data_box.molecule';

interface IOrganismUpcomingEventListProps {
    role: string
}

const OrganismUpcomingEventList: React.FunctionComponent<IOrganismUpcomingEventListProps> = ({ role }) => {
    const [item, setItem] = useState<UpcomingEventItem[]>()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const fetchUpcomingEvent = async () => {
        try {
            setLoading(true)
            const data = await getUpcomingEventRepo()
            setItem(data)
        } catch (err: any) {
            if (err.response?.status === 404 && err.response?.data?.message) {
                setItem([])
                return []
            }
            
            setError(err?.response?.data?.message || "Something went wrong")
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchUpcomingEvent()
    }, [])

    if (loading) return <Skeleton style={{height:"400px"}}/>
    if (error) return <MoleculeNoDataBox title="Something went wrong" style={{height:"400px"}}/>

    return (
        <div className="bg-gray-100 p-10 rounded-2xl">
            <AtomText type='content-title' text='Upcoming Events'/>
            <div className='flex gap-2 flex-col mt-3 max-h-[50vh] overflow-y-auto'>
                { 
                    !loading && !error && item && item.length > 0 ?
                        item.map((dt, idx) => <MoleculeUpcomingEventBox item={dt} key={idx} role={role}/>)
                    :
                        <MoleculeNoDataBox title={`You don't have event ${role === 'customer' ? 'to attend' : 'on held'} right now`} style={{height:"140px"}} color='gray'/>
                }
            </div>
        </div>
    )
}

export default OrganismUpcomingEventList;
