"use client"
import React, { useEffect, useState } from 'react'
import AtomText from '../atoms/text.atom'
import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from '../ui/badge'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLocationDot, faUser, faUsers } from '@fortawesome/free-solid-svg-icons'
import { Input } from '../ui/input'
import OrganismEventAttendee from './event_attendee_list.organism'
import OrganismDashboardList from './event_dashboard_list.organism'
import { getRecentEventRepo, RecentEventData } from '@/repositories/r_event'
import Skeleton from 'react-loading-skeleton'
import MoleculeNoDataBox from '../molecules/no_data_box.molecule'
import { convertUTCToLocal } from '@/helpers/converter.helper'

interface IOrganismEventMonitoringListProps {}

const OrganismEventMonitoringList: React.FunctionComponent<IOrganismEventMonitoringListProps> = () => {
    // For repo fetching
    const [item, setItem] = useState<RecentEventData[]>()
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    // For state management
    const [search, setSearch] = useState<string>("")
    const [page, setPage] = useState(1)

    const fetchAllRecentEvent = async (page: number, search: string | null) => {
        try {
            const data = await getRecentEventRepo(page, search)
            setItem(data.data)
            setPage(data.meta.page)
        } catch (err: any) {
            setError(err?.response?.data?.message || "Something went wrong")
        } finally { 
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchAllRecentEvent(page, null)
    }, [])

    // Search action
    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => fetchAllRecentEvent(page, search.length > 0 ? search : null)
    
    return (
        <div className="box-bordered">
            <AtomText type='sub-title-small' text='Recent Event'/>
            <div className='md:flex md:flex-col md:items-end'>
                <div>
                    <AtomText type='content' text='Search event'/>
                    <Input type="text" placeholder="Search by event title or venue name" className='w-full md:min-w-[300px]'
                        value={search} onChange={(e) => setSearch(e.target.value)} onBlur={handleSearch}/>
                </div>
            </div>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Event</TableHead>
                        <TableHead>Period</TableHead>
                        <TableHead>Category</TableHead>
                        <TableHead>Total Revenue</TableHead>
                        <TableHead>Detail</TableHead>
                        <TableHead>Booked Seat</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    { 
                        loading && (
                            <TableRow>
                                <TableCell colSpan={6}>
                                    <Skeleton style={{ height: "100px" }} />
                                </TableCell>
                            </TableRow>
                        )
                    }
                    {
                        (!loading && error) || (!loading && item?.length === 0) && (
                            <TableRow>
                                <TableCell colSpan={6}>
                                    <MoleculeNoDataBox title="No enough data to show" style={{ height: "100px" }} color='gray'/>
                                </TableCell>
                            </TableRow>
                        )
                    }
                    {
                        !loading && item && item.map((dt) => {
                            return (
                                <TableRow key={dt.id}>
                                    <TableCell>
                                        <AtomText type='content' text={dt.event_title} extraClass='mb-1'/>
                                        <Badge variant="outline"><FontAwesomeIcon icon={faLocationDot}/> {dt.event_schedule[0].venue.venue_name}</Badge>
                                    </TableCell>
                                    <TableCell>
                                        <AtomText text='Start At' type='label' extraClass='font-semibold'/>
                                        <br/>
                                        {convertUTCToLocal(dt.event_schedule[0].start_date)}
                                        <br/>
                                        <AtomText text='End At' type='label' extraClass='font-semibold'/>
                                        <br/>
                                        {convertUTCToLocal(dt.event_schedule[0].end_date)}
                                    </TableCell>
                                    <TableCell>
                                        <div className='flex gap-2'>
                                            <Badge className='bg-blue-200 text-blue-700 capitalize'>{dt.event_category}</Badge>
                                            { dt.is_paid ?? <Badge className="bg-green-200 text-green-700">Free Event</Badge> }
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <div className='flex gap-2'>
                                            Rp. {dt.total_revenue.toLocaleString()}
                                        </div>  
                                    </TableCell>
                                    <TableCell className='flex gap-2'>
                                        <OrganismEventAttendee eventId={dt.id} eventTitle={dt.event_title}/>
                                        <OrganismDashboardList eventId={dt.id} eventTitle={dt.event_title}/>
                                    </TableCell>
                                    <TableCell><FontAwesomeIcon icon={faUser}/> {dt.total_booked_seat} / {dt.maximum_seat}</TableCell>
                                </TableRow>
                            )
                        })
                    }
                </TableBody>
            </Table>
        </div>
    )
}

export default OrganismEventMonitoringList;