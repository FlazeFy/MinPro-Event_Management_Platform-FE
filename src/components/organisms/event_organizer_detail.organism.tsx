'use client'
import React, { useEffect, useState } from 'react'
import Skeleton from 'react-loading-skeleton';
import MoleculeNoDataBox from '@/components/molecules/no_data_box.molecule';
import Swal from 'sweetalert2';
import router from 'next/router';
import { EventOrganizerDetailItem, getEventOrganizerDetailByIdRepo } from '@/repositories/r_event_organizer';
import MoleculeNewComerEventOrganizerBox from '@/components/molecules/new_comer_event_organizer_box.molecule';
import AtomText from '@/components/atoms/text.atom';
import MoleculeEventBox from '@/components/molecules/event_box.molecule';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { EventItem } from '@/repositories/r_event';

interface OrganismsEventOrganizerDetailProps {
    id: string
}

const OrganismsEventOrganizerDetail: React.FunctionComponent<OrganismsEventOrganizerDetailProps> = ({ id }) => {
    // For repo fetching
    const [item, setItem] = useState<EventOrganizerDetailItem>()
    const [eventItem, setEventItems] = useState<EventItem[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    // For filter
    const [search, setSearch] = useState("")
    const [debouncedSearch, setDebouncedSearch] = useState("")
    // For state management
    const [page, setPage] = useState(1)
    const [totalPage, setTotalPage] = useState(1)

    const fetchEventOrganizerDetailById = async (page: number, search: string | null, id: string) => {
        setLoading(true)
        if (page === 1) {
            setEventItems([])
        }
        try {
            const { data, meta } = await getEventOrganizerDetailByIdRepo(page, search, null, id)
            setItem(data)
            setEventItems(prev => page=== 1 ? data.events : [...prev, ...data.events])
            setTotalPage(meta.total_page)
        } catch (err: any) {
            if (err.response?.status === 404 && err.response?.data?.message) {
                return null
            }

            setError(err?.response?.data?.message || "Something went wrong")
        } finally { 
            setLoading(false)
        }
    }
    
    useEffect(() => {
        const timer = setTimeout(() => {
            setPage(1)                
            setDebouncedSearch(search) 
        }, 500)

        return () => clearTimeout(timer)
    }, [search])

    useEffect(() => {
        if (!id) return

        fetchEventOrganizerDetailById(page, debouncedSearch.length > 0 ? debouncedSearch : null, id)
    }, [page, debouncedSearch, id])

    if (loading) return <Skeleton style={{height:"400px"}}/>
    if (error) return <MoleculeNoDataBox title="Something went wrong" style={{height:"400px"}}/>
    if (!item) {
        Swal.fire({
            icon: "error",
            title: "Event Organizer Not Found",
            text: "The event organizer you are looking for does not exist or has been removed.",
            confirmButtonText: "Back to Home",
            allowOutsideClick: false,
            allowEscapeKey: false,
        }).then((result) => {
            if (result.isConfirmed) router.push('/')
        })
    
        return
    }

    return (
        <div className="flex flex-wrap">
            <div className="w-full md:w-5/12 lg:w-4/12 pb-5 md:pb-0 flex flex-col items-center">
                <div className='md:sticky md:top-30'>
                    <MoleculeNewComerEventOrganizerBox item={item} isFlexible={true}/>
                </div>
            </div>
            <div className="w-full md:w-7/12 lg:w-8/12 md:ps-5">
                <div className='flex justify-between items-center'>
                    <AtomText type='content-title' text='All Event'/>
                    <Input type="text" placeholder="Search by event title or venue name" className='lg:w-[300px]' value={search} onChange={(e) => setSearch(e.target.value)}/>
                </div>
                <div className="mt-6 overflow-hidden pb-5">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        { loading && <Skeleton style={{ height: "100px" }}/> }
                        { (!loading && error) || (!loading && eventItem?.length === 0) && <MoleculeNoDataBox title="No enough data to show" style={{ height: "100px" }} color='gray'/> }
                        { eventItem && eventItem.length > 0 && eventItem.map((dt, idx) => <MoleculeEventBox key={idx} event={dt} role={'customer'}/>)}
                    </div>
                </div>
                {
                    page < totalPage && (
                        <div className="mt-8 flex justify-center">
                            <Button variant="outline" className="h-11 rounded-xl border-gray-300 bg-white px-8 text-base font-semibold text-slate-700 hover:bg-slate-50" onClick={() => setPage(prev => prev + 1)}disabled={loading}>
                                {loading ? "Loading..." : "Load More Events"}
                            </Button>
                        </div>
                    )
                }
            </div>
        </div>
    )
}

export default OrganismsEventOrganizerDetail;