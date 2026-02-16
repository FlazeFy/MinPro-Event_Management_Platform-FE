"use client"
import * as React from 'react'
import AtomText from '../atoms/text.atom'
import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from '../ui/badge'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLocationDot, faPieChart, faUser, faUsers } from '@fortawesome/free-solid-svg-icons'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import OrganismEventAttendee from './event_attendee_list.organism'
import OrganismDashboardList from './event_dashboard_list.organism'

interface IOrganismEventMonitoringListProps {}

const OrganismEventMonitoringList: React.FunctionComponent<IOrganismEventMonitoringListProps> = () => {
    const invoices = [
        {
            id: "INV001",
            event_title: "Concert A",
            venue_name: "GBK",
            event_category: "concert",
            seat: {
                max: 100,
                booked: 75
            },
            start_date: "10 Jan 2026 10:20",
            end_date: "10 Jan 2026 10:20",
            is_free: true,
            total_revenue: 20000
        },
        {
            id: "INV002",
            event_title: "Concert B",
            venue_name: "GBK",
            event_category: "concert",
            seat: {
                max: 100,
                booked: 75
            },
            start_date: "10 Jan 2026 10:20",
            end_date: "10 Jan 2026 10:20",
            is_free: false,
            total_revenue: 20000
        }
    ]
    
    return (
        <div className="box-bordered">
            <AtomText type='sub-title-small' text='Recent Event'/>
            <div className='flex mb-5 justify-end gap-2'>
                <div>
                    <AtomText type='content' text='Filter by Status'/>
                    <Select>
                        <SelectTrigger className="w-[200px] text-foreground">
                            <SelectValue placeholder="Status" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All</SelectItem>
                            <SelectItem value="live">Live</SelectItem>
                            <SelectItem value="incoming">Incoming</SelectItem>
                            <SelectItem value="finished">Finished</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <div>
                    <AtomText type='content' text='Search event'/>
                    <Input type="text" placeholder="Search by event title or venue name" style={{minWidth:"340px"}}/>
                </div>
            </div>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[100px]">ID</TableHead>
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
                        invoices.map((dt) => {
                            return (
                                <TableRow key={dt.id}>
                                    <TableCell className="font-medium">{dt.id}</TableCell>
                                    <TableCell>
                                        <AtomText type='content' text={dt.event_title} extraClass='mb-1'/>
                                        <Badge variant="outline"><FontAwesomeIcon icon={faLocationDot}/> {dt.venue_name}</Badge>
                                    </TableCell>
                                    <TableCell>{dt.start_date} - {dt.end_date}</TableCell>
                                    <TableCell>
                                        <div className='flex gap-2'>
                                            <Badge className={`bg-blue-200 text-blue-700`}>{dt.event_category}</Badge>
                                            { dt.is_free && <Badge className="bg-green-200 text-green-700">Discounted</Badge> }
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <div className='flex gap-2'>
                                            Rp. {dt.total_revenue.toLocaleString()}
                                        </div>  
                                    </TableCell>
                                    <TableCell className='flex gap-2'>
                                        <OrganismEventAttendee/>
                                        <OrganismDashboardList/>
                                    </TableCell>
                                    <TableCell><FontAwesomeIcon icon={faUser}/> {dt.seat.booked} / {dt.seat.max}</TableCell>
                                </TableRow>
                            )
                        })
                    }
                </TableBody>
                <TableFooter>
                    <TableRow>
                        <TableCell colSpan={6}>Remaining Seat</TableCell>
                        <TableCell><FontAwesomeIcon icon={faUsers}/> 30</TableCell>
                    </TableRow>
                </TableFooter>
            </Table>
        </div>
    )
}

export default OrganismEventMonitoringList;