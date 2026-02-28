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
            <OrganismSummaryEventList isFull={true}/>
            <br/>
            <OrganismPeriodicGrowthBox/>
            <br/>
            <OrganismRecentTransactionList role={role}/>
            <OrganismEventMonitoringList/>
        </div>
    )
}
