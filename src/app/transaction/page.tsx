import OrganismsSummaryEventList from '@/components/organisms/summary_event_list.organism'
import React from 'react'

export default function TransactionPage() {
    return (
        <div className="flex flex-col min-h-[100vh] p-5 lg:p-10">
            <div className="flex flex-wrap mt-5">
                <div className="w-full md:w-8/12 lg:w-9/12 p-0 md:pr-4">
                    <OrganismsSummaryEventList/>
                </div>
                <div className="w-full md:w-4/12 lg:w-3/12">

                </div>
            </div>
        </div>
    )
}
