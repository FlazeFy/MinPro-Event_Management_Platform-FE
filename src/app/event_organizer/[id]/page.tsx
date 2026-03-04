'use client'
import React from 'react'
import OrganismsEventOrganizerDetail from '@/components/organisms/event_organizer_detail.organism';
import { useParams } from 'next/navigation';

export default function EventOrganizerDetailPage() {
    // Param
    const params = useParams()
    const id = params?.id as string
    return (
        <div className="min-h-screen p-5 lg:p-10 max-w-[1080px] mx-auto">
            <OrganismsEventOrganizerDetail id={id}/>
        </div>
    )
}
