"use client"
import React, { useEffect, useState } from 'react'
import AtomText from '../atoms/text.atom'
import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from '../ui/badge'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faImage, faLocationDot, faReceipt, faTicket } from '@fortawesome/free-solid-svg-icons'
import { Input } from '../ui/input'
import MoleculeTransactionBox from '../molecules/transaction_molecule'
import { AllTransactionResponse, getAllTransaction } from '@/repositories/r_transaction'
import { convertUTCToLocal } from '@/helpers/converter.helper'
import MoleculeCopyBox from '../molecules/copy_box.molecule'
import Skeleton from 'react-loading-skeleton'
import MoleculeNoDataBox from '../molecules/no_data_box.molecule'
import OrganismCustomerTransactionList from './customer_transaction_list'
import { Button } from '../ui/button'
import OrganismAddTransactionReceiptForm from './add_transaction_receipt_form.organism'
import Link from 'next/link'
import { Role } from '@/store/s_auth'

interface IOrganismRecentTransactionListProps {
    role: Role
    action?: () => void
}

const OrganismRecentTransactionList: React.FunctionComponent<IOrganismRecentTransactionListProps> = ({ role, action }) => {
    // For repo fetching
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
        <div className="box-bordered mb-5">
            <AtomText type='sub-title-small' text='Recent Transaction'/>
            <div className='flex mb-5 justify-between lg:justify-end gap-2'>
                <div>
                    <AtomText type='content' text='Filter by Status'/>
                    <Select value={status} onValueChange={handleStatusChange}>
                        <SelectTrigger className="w-[120px] text-foreground">
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
                    <Input type="text" placeholder="Search by event title or venue name" className='lg:w-[300px]'
                        value={search} onChange={(e) => setSearch(e.target.value)} onBlur={handleSearch}
                    />
                </div>
            </div>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Transaction Code & Event</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>{ role === "event_organizer" ? <>Customer</> : <>Status</> }</TableHead>
                        <TableHead>{ role === "event_organizer" ? <>History</> : <>Method</> }</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead>Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    { 
                        loading && 
                            <TableRow>
                                <TableCell colSpan={6}>
                                    <Skeleton style={{ height: "100px" }} />
                                </TableCell>
                            </TableRow>
                    }
                    {
                        (!loading && error) || (!loading && item?.data.length === 0) && 
                            <TableRow>
                                <TableCell colSpan={6}>
                                    <MoleculeNoDataBox title="No enough data to show" style={{ height: "100px" }} color='gray'/>
                                </TableCell>
                            </TableRow>
                    }
                    {
                        !loading && !error && item?.data.map((dt, idx) => {
                            const statusColor = dt.status === 'paid' ? 'bg-green-200 text-green-700' 
                                : dt.status === 'attended' ? 'bg-blue-200 text-blue-700' 
                                : 'bg-orange-200 text-orange-700' 

                            return (
                                <TableRow key={idx}>
                                    <TableCell>
                                        <AtomText type='content' text={dt.transaction_code} extraClass='mb-1 font-semibold'/>
                                        <Link href={`/event/${dt.event.id}`}>
                                            <div className='border border-gray-200 cursor-pointer p-2 rounded-xl hover:shadow-lg transition-all duration-300'>
                                                <AtomText type='content' text={dt.event.event_title} extraClass='mb-1'/>
                                                <Badge variant="outline"><FontAwesomeIcon icon={faLocationDot}/> {dt.event.event_schedule[0].venue.venue_name}</Badge>
                                                {
                                                    role === "customer" &&
                                                        <div className='flex flex-wrap mt-2 gap-2 justify-between'>
                                                            <div>
                                                                <AtomText type='sub-content' text='Event Start At' extraClass='font-semibold'/>
                                                                <AtomText type='sub-content' text={convertUTCToLocal(dt.event.event_schedule[0].start_date)}/>
                                                            </div>
                                                            <div>
                                                                <AtomText type='sub-content' text='Event End At' extraClass='font-semibold'/>
                                                                <AtomText type='sub-content' text={convertUTCToLocal(dt.event.event_schedule[0].end_date)}/>
                                                            </div>
                                                        </div>
                                                }
                                            </div>
                                        </Link>
                                    </TableCell>
                                    <TableCell><AtomText type='sub-content' text={convertUTCToLocal(dt.created_at)}/></TableCell>
                                    <TableCell>
                                        {
                                            role === "event_organizer" && <MoleculeTransactionBox 
                                                title={dt.customer.username} desc={<div className='capitalize'>{dt.payment_method.replaceAll('_',' ')}</div>}
                                                profileImage={dt.customer.profile_pic ?? '/images/user.png'} withPoint={false}/>
                                        }
                                        <div className='flex gap-2'>
                                            <Badge className={`${statusColor} capitalize`}>{dt.status}</Badge>
                                            { dt.is_discount && <Badge className="bg-green-200 text-green-700">Discount</Badge> }
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        {
                                            role === "customer" ? <div className='capitalize'>{dt.payment_method.replaceAll("_", " ")}</div> : <OrganismCustomerTransactionList customer={dt.customer}/>
                                        }
                                    </TableCell>
                                    <TableCell style={{minWidth:"220px"}}>
                                        {
                                            dt.real_amount === 0 ? 
                                                <AtomText type='sub-content' text='Rp. 0'/>
                                            :
                                                <div className='grid grid-cols-2 gap-10'>
                                                    <div>
                                                        <AtomText type='sub-content' text='Real Price' extraClass='font-semibold'/>
                                                        <AtomText type='sub-content' text={`Rp. ${(dt.real_amount).toLocaleString()}`}/>
                                                        {
                                                            dt.discount_cut > 0 &&
                                                                <>
                                                                    <AtomText type='sub-content' text='Discount Cut' extraClass='font-semibold'/>
                                                                    <AtomText type='sub-content' text={`Rp. ${dt.discount_cut.toLocaleString()}`}/>
                                                                </>
                                                        }
                                                        {
                                                            dt.point_cut > 0 &&
                                                                <>
                                                                    <AtomText type='sub-content' text='Point Cut' extraClass='font-semibold'/>
                                                                    <AtomText type='sub-content' text={`Rp. ${dt.point_cut.toLocaleString()}`}/>
                                                                </>
                                                        }
                                                    </div>  
                                                    <div className='flex flex-col'>
                                                        <AtomText type='sub-content' text='Final Price' extraClass='font-semibold'/>
                                                        <AtomText type='sub-content' text={<>Rp. {dt.final_amount.toLocaleString()}</>}/>
                                                        { role === "customer" && dt.final_amount > 0 && dt.status !== "pending" && <Badge className='bg-green-200 text-green-700 mt-2'>+{Math.floor(dt.final_amount / 1000)} Pts</Badge> } 
                                                    </div>  
                                                </div>
                                        }
                                    </TableCell>
                                    <TableCell>
                                        {
                                            dt.status === "pending" ? 
                                                <OrganismAddTransactionReceiptForm id={dt.id} action={() => {
                                                    fetchAllTransaction(page, null, null)
                                                    if (action) action()
                                                }}/> 
                                            : dt.status !== "pending" ?
                                                <div className='flex gap-2'>
                                                    {
                                                        dt.transaction_pic &&  
                                                            <Link href={dt.transaction_pic}>
                                                                <Button className='h-full'><FontAwesomeIcon icon={faImage}/></Button>
                                                            </Link>
                                                    }
                                                    {
                                                        dt.ticket_token && <MoleculeCopyBox value={dt.ticket_token} context={'Ticket token'}/>
                                                    }
                                                </div>
                                            :
                                                <></>
                                        }
                                    </TableCell>
                                </TableRow>
                            )
                        })
                    }
                </TableBody>
                <TableFooter>
                    <TableRow>
                        <TableCell colSpan={6}>Average Transaction Amount</TableCell>
                        <TableCell>Rp. {average.toLocaleString()}</TableCell>
                    </TableRow>
                </TableFooter>
            </Table>
        </div>
    )
}

export default OrganismRecentTransactionList;