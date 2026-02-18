'use client'
import React, { useEffect, useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRotateLeft } from '@fortawesome/free-solid-svg-icons'
import MoleculeTransactionBox from '../molecules/transaction_molecule'
import { PaginationMeta, UserShortInfo } from '@/repositories/template'
import { CustomerTransactionByEventOrganizer, getCustomerTransactionByEventOrganizer } from '@/repositories/r_stats'
import { Badge } from '../ui/badge'
import { convertUTCToLocal } from '@/helpers/converter.helper'
import AtomText from '../atoms/text.atom'
import { Input } from '../ui/input'
import MoleculeNoDataBox from '../molecules/no_data_box.molecule'
import Skeleton from 'react-loading-skeleton'
import AtomDivider from '../atoms/divider.atom'

interface IOrganismCustomerTransactionProps {
    customer: UserShortInfo
}

const OrganismCustomerTransaction: React.FunctionComponent<IOrganismCustomerTransactionProps> = ({ customer }) => {
    const [item, setItem] = useState<CustomerTransactionByEventOrganizer[]>()
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    // For state management
    const [search, setSearch] = useState<string>("")
    const [meta, setMeta] = useState<PaginationMeta>()
    const [open, setOpen] = useState(false)
    const [page, setPage] = useState(1)

    const fetchCustomerTransactionByEventOrganizer = async (page: number, customerId: string, search: string | null) => {
        try {
            const { data, meta } = await getCustomerTransactionByEventOrganizer(page, customerId, search)
            setItem(data)
            setMeta(meta)
        } catch (err: any) {
            setError(err?.response?.data?.message || "Something went wrong")
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchCustomerTransactionByEventOrganizer(page, customer.id, null)
    }, [customer.id])

    // Open dialog action
    const handleOpenChange = (isOpen: boolean) => {
        setOpen(isOpen)
        if (isOpen && customer) fetchCustomerTransactionByEventOrganizer(page, customer.id, null)
    }
    // Search action
    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => fetchCustomerTransactionByEventOrganizer(page, customer.id, search.length > 0 ? search : null)

    return (
        <Dialog onOpenChange={handleOpenChange} open={open}>
            <DialogTrigger asChild>
                <Button><FontAwesomeIcon icon={faRotateLeft}/></Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{customer.username}'s Transaction</DialogTitle>
                </DialogHeader>
                <div className="flex flex-col gap-3 max-h-[75vh] overflow-y-auto pr-2">
                    <AtomText type='content' text='Search transaction'/>
                    <Input type="text" placeholder="Search by event title" value={search} onChange={(e) => setSearch(e.target.value)} onBlur={handleSearch}/>
                    <AtomDivider/>
                    { loading && <Skeleton style={{ height: "100px" }}/> }
                    { (!loading && error) || (!loading && item?.length === 0) && <MoleculeNoDataBox title="No enough data to show" style={{ height: "100px" }}/> }
                    {
                        !loading && !error && item?.map((dt, idx) => (
                            <MoleculeTransactionBox key={idx} title={`Rp. ${dt.amount.toLocaleString()}`} desc={
                                <><Badge className='bg-green-100 text-green-700 capitalize'>{dt.event.event_category.replaceAll('_',' ')}</Badge> {dt.event.event_title} at {convertUTCToLocal(dt.created_at)}</>
                            } withPoint={false}/>
                        ))
                    }
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default OrganismCustomerTransaction
