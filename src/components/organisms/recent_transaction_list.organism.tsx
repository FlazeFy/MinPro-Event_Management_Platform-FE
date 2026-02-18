"use client"
import React, { useEffect, useState } from 'react'
import AtomText from '../atoms/text.atom'
import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from '../ui/badge'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLocationDot } from '@fortawesome/free-solid-svg-icons'
import { Input } from '../ui/input'
import MoleculeTransactionBox from '../molecules/transaction_molecule'
import { AllTransactionResponse, getAllTransaction } from '@/repositories/r_transaction'
import { convertUTCToLocal } from '@/helpers/converter.helper'
import MoleculeCopyBox from '../molecules/copy_box.molecule'
import Skeleton from 'react-loading-skeleton'
import MoleculeNoDataBox from '../molecules/no_data_box.molecule'
import OrganismCustomerTransactionList from './customer_transaction_list'

interface IOrganismRecentTransactionListProps {
    role: string
}

const OrganismRecentTransactionList: React.FunctionComponent<IOrganismRecentTransactionListProps> = ({ role }) => {
    const [item, setItem] = useState<AllTransactionResponse>()
    const [loading, setLoading] = useState(true)
    const [average, setAverage] = useState(0)
    const [error, setError] = useState<string | null>(null)
    // For state management
    const [search, setSearch] = useState<string>("")
    const [status, setStatus] = useState<string>("all")
    const [page, setPage] = useState(1)

    const fetchAllTransaction = async (page: number, search: string | null, status: string | null) => {
        try {
            const data = await getAllTransaction(page, search, status)
            setItem(data)
            setAverage(data.average_transaction)
        } catch (err: any) {
            setError(err?.response?.data?.message || "Something went wrong")
        } finally { 
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchAllTransaction(page, null, null)
    }, [])

    // Search action
    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => fetchAllTransaction(page, search.length > 0 ? search : null, status)
    // Filter action
    const handleStatusChange = (value: string) => {
        setStatus(value)
        fetchAllTransaction(page, search.length > 0 ? search : null, value)
    }

    return (
        <div className="box-bordered">
            <AtomText type='sub-title-small' text='Recent Transaction'/>
            <div className='flex mb-5 justify-end gap-2'>
                <div>
                    <AtomText type='content' text='Filter by Status'/>
                    <Select value={status} onValueChange={handleStatusChange}>
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
                    <Input type="text" placeholder="Search by event title or venue name" style={{minWidth:"340px"}}
                        value={search} onChange={(e) => setSearch(e.target.value)} onBlur={handleSearch}
                    />
                </div>
            </div>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[100px]">ID</TableHead>
                        <TableHead>Event</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>{ role === "event_organizer" ? <>Customer</> : <>Status</> }</TableHead>
                        <TableHead>{ role === "event_organizer" ? <>History</> : <>Method</> }</TableHead>
                        <TableHead>Amount</TableHead>
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
                        (!loading && error) || (!loading && item?.data.length === 0) && (
                            <TableRow>
                                <TableCell colSpan={6}>
                                    <MoleculeNoDataBox title="No enough data to show" style={{ height: "100px" }}/>
                                </TableCell>
                            </TableRow>
                        )
                    }
                    {
                        !loading && !error && item?.data.map((dt, idx) => {
                            const statusColor = dt.status === 'paid' ? 'green' : dt.status === 'attended' ? 'blue' : 'red'

                            return (
                                <TableRow key={idx}>
                                    <TableCell className="font-medium">
                                        <MoleculeCopyBox value={dt.id} context='Transaction ID' isWithGrid={false}/>
                                    </TableCell>
                                    <TableCell>
                                        <AtomText type='content' text={dt.event.event_title} extraClass='mb-1'/>
                                        <Badge variant="outline"><FontAwesomeIcon icon={faLocationDot}/> {dt.event.event_schedule[0].venue.venue_name}</Badge>
                                    </TableCell>
                                    <TableCell><AtomText type='sub-content' text={convertUTCToLocal(dt.created_at)}/></TableCell>
                                    <TableCell>
                                        {
                                            role === "event_organizer" && <MoleculeTransactionBox 
                                                title={dt.customer.username} desc={dt.payment_method.replaceAll('_',' ')}
                                                profileImage={dt.customer.profile_pic ?? '/images/user.jpg'} withPoint={false}/>
                                        }
                                        <div className='flex gap-2'>
                                            <Badge className={`bg-${statusColor}-200 text-${statusColor}-700 capitalize`}>{dt.status}</Badge>
                                            { dt.is_discount && <Badge className="bg-green-200 text-green-700">Discount</Badge> }
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        {
                                            role === "customer" ? dt.payment_method : <OrganismCustomerTransactionList customer={dt.customer}/>
                                        }
                                    </TableCell>
                                    <TableCell>
                                        <div className='flex gap-2'>
                                            <AtomText type='sub-content' text={<>Rp. {dt.amount.toLocaleString()}</>}/>
                                            { role === "customer" && <Badge className='bg-green-200 text-green-700'>+{dt.amount / 10000} Pts</Badge> } 
                                        </div>  
                                    </TableCell>
                                </TableRow>
                            )
                        })
                    }
                </TableBody>
                <TableFooter>
                    <TableRow>
                        <TableCell colSpan={5}>Average Transaction Amount</TableCell>
                        <TableCell>Rp. {average.toLocaleString()}</TableCell>
                    </TableRow>
                </TableFooter>
            </Table>
        </div>
    )
}

export default OrganismRecentTransactionList;