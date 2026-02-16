'use client'
import OrganismsEventMonitoringList from '@/components/organisms/event_monitoring_list.organism'
import OrganismsPeriodicGrowthBox from '@/components/organisms/periodic_growth.organism'
import OrganismsRecentTransactionList from '@/components/organisms/recent_transaction_list.organism'
import OrganismsSummaryEventList from '@/components/organisms/summary_event_list.organism'
import useAuthStore from '@/store/s_auth'
import React from 'react'

export default function TransactionPage() {
    const { role } = useAuthStore()

    return (
        <div className="flex flex-col min-h-[100vh] p-5 lg:p-10">
            <div className="flex flex-wrap mt-5">
                <div className="w-full md:w-8/12 lg:w-9/12 p-0 md:pr-4">
                    <OrganismsSummaryEventList isFull={true}/>
                    <br/>
                    <OrganismsPeriodicGrowthBox/>
                    <br/>
                    <OrganismsRecentTransactionList role={role}/>
                    {
                        role === "customer" && <><br/><OrganismsEventMonitoringList/></>
                    }
                </div>
                <div className="w-full md:w-4/12 lg:w-3/12">

                </div>
            </div>
        </div>
    )
}
