'use client'
import React, { useState, useEffect } from 'react'
import AtomText from '../atoms/text.atom';
import { faCalendar, faCrown, faTag, faTicket } from '@fortawesome/free-solid-svg-icons';
import AtomDivider from '../atoms/divider.atom';
import MoleculeTrendingEventOrganizerBox from '../molecules/trending_event_organizer_box.molecule';
import { getTrendingEventOrganizer, TrendingEventOrganizerResponse } from '@/repositories/r_event_organizer';
import Skeleton from 'react-loading-skeleton';
import MoleculeNoDataBox from '../molecules/no_data_box.molecule';

interface IOrganismTrendingEventOrganizerListProps {}

const OrganismTrendingEventOrganizerBox: React.FunctionComponent<IOrganismTrendingEventOrganizerListProps> = () => {
    const [item, setItem] = useState<TrendingEventOrganizerResponse>()
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    const fetchUpcomingEvent = async () => {
        try {
            const data = await getTrendingEventOrganizer()
            setItem(data)
        } catch (err: any) {
            setError(err?.response?.data?.message || "Something went wrong")
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchUpcomingEvent()
    }, [])

    if (loading) return <Skeleton style={{height:"400px"}}/>
    if (error || !item) return <MoleculeNoDataBox title="Something went wrong" style={{height:"400px"}}/>

    return (
        <div className="container">
            <AtomText type='content-title' text='Trending EO'/>
            <AtomDivider/>
            <MoleculeTrendingEventOrganizerBox icon={faCalendar} label='Most Event' val={item.most_events.organizer_name} color='blue' subval={`${item.most_events.value} Event`} id={item.most_events.id}/>
            <MoleculeTrendingEventOrganizerBox icon={faTicket} label='Most Free Event' val={item.most_free_event.organizer_name} color='yellow' subval={`${item.most_free_event.value} Event`} id={item.most_free_event.id}/>
            <MoleculeTrendingEventOrganizerBox icon={faCrown} label='Highest Avg Price' val={item.highest_average_price.organizer_name} color='red' subval={`Rp. ${Math.ceil(item.highest_average_price.value / 1000).toLocaleString()}K`} id={item.highest_average_price.id}/>
            <MoleculeTrendingEventOrganizerBox icon={faTag} label='Lowest Avg Price' val={item.lowest_average_price.organizer_name} color='green' subval={`Rp. ${Math.ceil(item.lowest_average_price.value / 1000).toLocaleString()}K`} id={item.lowest_average_price.id}/>
        </div>
    )
}

export default OrganismTrendingEventOrganizerBox;
