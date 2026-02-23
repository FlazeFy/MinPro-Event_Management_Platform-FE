'use client'
import OrganismEventMonitoringList from '@/components/organisms/event_monitoring_list.organism'
import OrganismPeriodicGrowthBox from '@/components/organisms/periodic_growth.organism'
import OrganismRecentTransactionList from '@/components/organisms/recent_transaction_list.organism'
import OrganismSummaryEventList from '@/components/organisms/summary_event_list.organism'
import useAuthStore from '@/store/s_auth'
import React from 'react'

export default function TransactionPage() {
    const { role } = useAuthStore()

    return (
        <div className="flex flex-col min-h-[100vh] p-5 lg:p-10">
            <div className="flex flex-wrap mt-5">
                <div className="w-full md:w-8/12 lg:w-9/12 p-0 md:pr-4">
                    <OrganismSummaryEventList isFull={true}/>
                    <br/>
                    <OrganismPeriodicGrowthBox/>
                    <br/>
                    <OrganismRecentTransactionList role={role}/>
                    { role === "event_organizer" && <><br/><OrganismEventMonitoringList/></> }
                </div>
                <div className="w-full md:w-4/12 lg:w-3/12">

                </div>
            </div>
        </div>
    )
}
