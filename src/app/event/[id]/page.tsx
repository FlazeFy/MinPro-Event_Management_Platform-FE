'use client'
import React, { useEffect, useState } from 'react'
import OrganismsEventOrganizerShortDetail from "@/components/organisms/event_organizer_short_detail.organism";
import MoleculeAboutEvent from "@/components/molecules/about_event.molecule";
import MoleculeEventSchedule from "@/components/molecules/event_schedule.molecule";
import MoleculeCommunityReviews from "@/components/molecules/community_reviews.molecule";
import { EventDetailItem, getEventDetailByIdRepo } from '@/repositories/r_event';
import Skeleton from 'react-loading-skeleton';
import MoleculeNoDataBox from '@/components/molecules/no_data_box.molecule';
import Swal from 'sweetalert2';
import router, { useRouter } from 'next/router';
import { useParams } from 'next/navigation';
import MoleculePriceBox from '@/components/organisms/price_box.molecule';

export default function EventDetailPage() {
    // For repo fetching
    const [item, setItem] = useState<EventDetailItem>()
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const params = useParams()
    const id = params?.id as string

    const fetchEventDetailById = async (id: string) => {
        try {
            const data = await getEventDetailByIdRepo(id)
            setItem(data)
        } catch (err: any) {
            setError(err?.response?.data?.message || "Something went wrong")
        } finally { 
            setLoading(false)
        }
    }

    useEffect(() => {
        if (id) fetchEventDetailById(id)
    }, [id])

    if (loading) return <Skeleton style={{height:"400px"}}/>
    if (error) return <MoleculeNoDataBox title="Something went wrong" style={{height:"400px"}}/>
    if (!item) {
        Swal.fire({
            icon: "error",
            title: "Event Not Found",
            text: "The event you are looking for does not exist or has been removed.",
            confirmButtonText: "Back to Home",
            allowOutsideClick: false,
            allowEscapeKey: false,
        }).then((result) => {
            if (result.isConfirmed) router.push('/')
        })
    
        return
    }

    return (
        <div className="min-h-screen p-5 lg:p-10">
            <div className="grid w-full grid-cols-1 gap-6 lg:grid-cols-12 lg:items-start">
                <div className="lg:col-span-9">
                    <MoleculeAboutEvent event_pic={item.event_pic} event_category={item.event_category} event_title={item.event_title}
                        event_organizer={item.event_organizer} event_desc={item.event_desc} id={''} is_paid={false} maximum_seat={0} event_price={0} event_schedule={[]} total_booked={0} available_seat={0}/>
                    <MoleculeEventSchedule start_date={item.event_schedule[0].start_date} end_date={item.event_schedule[0].end_date} venue={item.event_schedule[0].venue}/>
                    <MoleculeCommunityReviews/>
                </div>
                <div className="flex w-full flex-col gap-4 lg:col-span-3 lg:sticky lg:top-30">                    
                    <MoleculePriceBox price={item.event_price} availableSeats={item.available_seat} totalSeats={item.maximum_seat} />
                    <OrganismsEventOrganizerShortDetail id={item.event_organizer.id} organizer_name={item.event_organizer.organizer_name} bio={item.event_organizer.bio} profile_pic={item.event_organizer.profile_pic}/>
                </div>
            </div>
        </div>
    )
}
