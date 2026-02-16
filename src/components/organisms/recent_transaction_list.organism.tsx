"use client"
import * as React from 'react'
import AtomText from '../atoms/text.atom'
import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from '../ui/badge'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLocationDot } from '@fortawesome/free-solid-svg-icons'
import { Input } from '../ui/input'

interface IOrganismsRecentTransactionListProps {}

const OrganismsRecentTransactionList: React.FunctionComponent<IOrganismsRecentTransactionListProps> = () => {

    const invoices = [
        {
            id: "INV001",
            event_title: "Concert A",
            venue_name: "GBK",
            status: "paid",
            amount: 100000,
            payment_method: "Credit Card",
            created_at: "10 Jan 2026 10:20",
        },
        {
            id: "INV002",
            event_title: "Concert A",
            venue_name: "GBK",
            status: "attended",
            amount: 200000,
            payment_method: "PayPal",
            created_at: "10 Jan 2026 10:20",
        }
    ]
    
    return (
        <div className="box-bordered">
            <AtomText type='sub-title-small' text='Recent Transaction'/>
            <div className='flex mb-5 justify-end gap-2'>
                <div>
                    <AtomText type='content' text='Filter by Status'/>
                    <Select>
                        <SelectTrigger className="w-[200px] text-foreground">
                            <SelectValue placeholder="Status" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All</SelectItem>
                            <SelectItem value="pending">Pending</SelectItem>
                            <SelectItem value="paid">Paid</SelectItem>
                            <SelectItem value="attended">Attended</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <div>
                    <AtomText type='content' text='Search transaction'/>
                    <Input type="text" placeholder="Search by event title or venue name" style={{minWidth:"340px"}}/>
                </div>
            </div>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[100px]">ID</TableHead>
                        <TableHead>Event</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Method</TableHead>
                        <TableHead>Amount</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        invoices.map((dt) => {
                            const statusColor = dt.status === 'paid' ? 'green' : dt.status === 'attended' ? 'blue' : 'red'

                            return (
                                <TableRow key={dt.id}>
                                    <TableCell className="font-medium">{dt.id}</TableCell>
                                    <TableCell>
                                        <AtomText type='content' text={dt.event_title} extraClass='mb-1'/>
                                        <Badge variant="outline"><FontAwesomeIcon icon={faLocationDot}/> {dt.venue_name}</Badge>
                                    </TableCell>
                                    <TableCell>{dt.created_at}</TableCell>
                                    <TableCell>
                                        <Badge className={`bg-${statusColor}-200 text-${statusColor}-700`}>{dt.status}</Badge>
                                    </TableCell>
                                    <TableCell>{dt.payment_method}</TableCell>
                                    <TableCell>
                                        <div className='flex gap-2'>
                                            Rp. {dt.amount.toLocaleString()}
                                            <Badge className='bg-green-200 text-green-700'>+{dt.amount / 10000} Pts</Badge>  
                                        </div>  
                                    </TableCell>
                                </TableRow>
                            )
                        })
                    }
                </TableBody>
                <TableFooter>
                    <TableRow>
                        <TableCell colSpan={5}>Total</TableCell>
                        <TableCell>Rp. 300,000</TableCell>
                    </TableRow>
                </TableFooter>
            </Table>
        </div>
    )
}

export default OrganismsRecentTransactionList;