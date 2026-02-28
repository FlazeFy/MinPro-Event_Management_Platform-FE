'use client'
import React, { useEffect, useState } from 'react'
import OrganismsEventOrganizerShortDetail from "@/components/organisms/event_organizer_short_detail.organism";
import OrganismPriceBox from "@/components/organisms/price_box.organism";
import MoleculeAboutEvent from "@/components/molecules/about_event.molecule";
import MoleculeEventSchedule from "@/components/molecules/event_schedule.molecule";
import MoleculeCommunityReviews from "@/components/molecules/community_reviews.molecule";
import { EventDetailItem, getEventDetailByIdRepo } from '@/repositories/r_event';
import Skeleton from 'react-loading-skeleton';
import MoleculeNoDataBox from '@/components/molecules/no_data_box.molecule';
import Swal from 'sweetalert2';
import router from 'next/router';

interface EventDetailPageProps {
    params: {
        id: string
    }
}

export default function EventDetailPage({ params }: EventDetailPageProps) {
    // For repo fetching
    const [item, setItem] = useState<EventDetailItem>()
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

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
        fetchEventDetailById(params.id)
    }, [])

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
        <div className="min-h-screen p-5">
            <div className="grid w-full grid-cols-1 gap-6 lg:grid-cols-12 lg:items-start">
                <div className="lg:col-span-9">
                    <MoleculeAboutEvent
                        image="https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=2070&auto=format&fit=crop"
                        category={item.event_category} isHotEvent={!item.is_paid} title={item.event_title}
                        organizer={{
                            name: item.event_organizer.organizer_name,
                            image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=1974&auto=format&fit=crop"
                        }}
                        rating={4.9} reviews={124}  description={item.event_desc}
                    />
                    <MoleculeEventSchedule/>
                    <MoleculeCommunityReviews/>
                </div>
                <div className="flex w-full flex-col gap-4 lg:col-span-3">
                    <OrganismPriceBox price={item.event_price} availableSeats={item.available_seat} totalSeats={item.maximum_seat} />
                    <OrganismsEventOrganizerShortDetail />
                </div>
            </div>
        </div>
    )
}
