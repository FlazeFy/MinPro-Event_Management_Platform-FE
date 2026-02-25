'use client'
import React, { useEffect, useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPieChart } from '@fortawesome/free-solid-svg-icons'
import MoleculePieChart from '../molecules/pie_chart.molecule'
import AtomText from '../atoms/text.atom'
import { getTransactionDashboardByEventId, TransactionDashboardResponse } from '@/repositories/r_stats'
import Skeleton from 'react-loading-skeleton'

interface IOrganismDashboardListProps {}

const OrganismDashboardList: React.FunctionComponent<IOrganismDashboardListProps> = () => {
    // For repo fetching
    const [itemDashboard, setItemDashboard] = useState<TransactionDashboardResponse>()
    const [loadingDashboard, setLoadingDashboard] = useState(true)
    const [errorDashboard, setErrorDashboard] = useState<string | null>(null)
    // For state
    const [open, setOpen] = useState(false)

    const fetchTransactionDashboard = async (eventId: string) => {
        try {
            const data = await getTransactionDashboardByEventId(eventId) // for now
            console.log(data)
            setItemDashboard(data)
        } catch (err: any) {
            setErrorDashboard(err?.response?.data?.message || "Something went wrong")
        } finally { 
            setLoadingDashboard(false)
        }
    }
    
    const handleOpenChange = (state: boolean) => {
        setOpen(state)
        if (state && !itemDashboard) {
            fetchTransactionDashboard('d63337af-ee7b-4ed8-81cc-5a507280ea13')
        }
    }

    const attendeeLabels = itemDashboard?.attendee_gen_comparison.map(dt => dt.context) || []
    const attendeeData = itemDashboard?.attendee_gen_comparison.map(dt => dt.total) || []
    const bookingLabels = itemDashboard?.booking_time_comparison.map(dt => dt.context) || []
    const bookingData = itemDashboard?.booking_time_comparison.map(dt => dt.total) || []
    const discountLabels = itemDashboard?.transaction_discount_comparison.map(dt => dt.context) || []
    const discountData = itemDashboard?.transaction_discount_comparison.map(dt => dt.total) || []

    return (
        <Dialog open={open} onOpenChange={handleOpenChange}>
            <DialogTrigger asChild>
                <Button><FontAwesomeIcon icon={faPieChart}/></Button>
            </DialogTrigger>
            <DialogContent className='min-w-[860px]'>
                <DialogHeader>
                    <DialogTitle>Event Dashboard</DialogTitle>
                </DialogHeader>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-h-[75vh] overflow-y-auto text-center">
                    <div className='pb-5'>
                        <AtomText type='content-title' text='Attendee Age Generation Comparison'/>
                        { loadingDashboard && <Skeleton className="h-[200px] w-full rounded-xl"/> }
                        { 
                            !loadingDashboard && !errorDashboard && <MoleculePieChart labels={attendeeLabels} datasets={[{ label: 'Attendees', data: attendeeData }]}/>
                        }
                    </div>
                    <div className='pb-5'>
                        <AtomText type='content-title' text='Booking Time Comparison'/>
                        { loadingDashboard && <Skeleton className="h-[200px] w-full rounded-xl"/> }
                        { 
                            !loadingDashboard && !errorDashboard && <MoleculePieChart labels={bookingLabels} datasets={[{ label: 'Bookings', data: bookingData }]}/>
                        }
                    </div>
                    <div className='pb-5'>
                        <AtomText type='content-title' text='Transaction Discount Comparison'/>
                        { loadingDashboard && <Skeleton className="h-[200px] w-full rounded-xl"/> }
                        { 
                            !loadingDashboard && !errorDashboard && <MoleculePieChart labels={discountLabels} datasets={[{ label: 'Bookings', data: discountData }]}/>
                        }
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default OrganismDashboardList
