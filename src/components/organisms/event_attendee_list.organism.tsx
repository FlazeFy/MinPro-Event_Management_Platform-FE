'use client'
import React, { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUsers } from '@fortawesome/free-solid-svg-icons'
import MoleculeTransactionBox from '../molecules/transaction_molecule'
import { PaginationMeta } from '@/repositories/template'
import { EventAttendeeItem, getEventAttendeeByEventId } from '@/repositories/r_event'
import AtomText from '../atoms/text.atom'
import { Input } from '../ui/input'
import AtomDivider from '../atoms/divider.atom'
import Skeleton from 'react-loading-skeleton'
import MoleculeNoDataBox from '../molecules/no_data_box.molecule'
import { convertUTCToLocal } from '@/helpers/converter.helper'
import { Badge } from '../ui/badge'

interface IOrganismEventAttendeeProps {
    eventId: string
    eventTitle: string
}

const OrganismEventAttendee: React.FunctionComponent<IOrganismEventAttendeeProps> = ({ eventId, eventTitle }) => {
    // For repo fetching
    const [item, setItem] = useState<EventAttendeeItem[]>()
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    // For state management
    const [search, setSearch] = useState<string>("")
    const [meta, setMeta] = useState<PaginationMeta>()
    const [open, setOpen] = useState(false)
    const [page, setPage] = useState(1)

    const fetchEventAttendee = async (page: number, customerId: string, search: string | null) => {
        try {
            const { data, meta } = await getEventAttendeeByEventId(page, customerId, search)
            setItem(data)
            setMeta(meta)
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

    // Open dialog action
    const handleOpenChange = (isOpen: boolean) => {
        setOpen(isOpen)
        if (isOpen && event) fetchEventAttendee(page, eventId, null)
    }
    // Search action
    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => fetchEventAttendee(page, eventId, search.length > 0 ? search : null)

    return (
        <Dialog onOpenChange={handleOpenChange} open={open}>
            <DialogTrigger asChild>
                <Button><FontAwesomeIcon icon={faUsers}/></Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{eventTitle} Attendee List</DialogTitle>
                </DialogHeader>
                <div className="flex flex-col gap-3 max-h-[75vh] overflow-y-auto pr-2">
                    <AtomText type='content' text='Search attendee'/>
                    <Input type="text" placeholder="Search by fullname or username" value={search} onChange={(e) => setSearch(e.target.value)} onBlur={handleSearch}/>
                    <AtomDivider/>
                    { loading && <Skeleton style={{ height: "100px" }}/> }
                    { (!loading && error) || (!loading && item?.length === 0) && <MoleculeNoDataBox title="No enough data to show" style={{ height: "100px" }}/> }
                    {
                        !loading && !error && item?.map((dt, idx) => (
                            <MoleculeTransactionBox key={idx} title={dt.fullname} desc={
                                <><Badge className='bg-green-100 text-green-700 capitalize'>{`Booked by ${dt.transaction.customer.username}`}</Badge> at {convertUTCToLocal(dt.transaction.created_at)}</>
                            } withPoint={false}/>
                        ))
                    }
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default OrganismEventAttendee
