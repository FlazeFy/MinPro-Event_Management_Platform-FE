'use client'
import React, { useState, useEffect } from 'react'
import AtomText from '../atoms/text.atom';
import MoleculeNewComerEventOrganizerBox from '../molecules/new_comer_event_organizer_box.molecule';
import { getNewComerEventOrganizerRepo, NewComerEventOrganizerItem } from '@/repositories/r_event_organizer';
import Skeleton from 'react-loading-skeleton';
import MoleculeNoDataBox from '../molecules/no_data_box.molecule';
import { Input } from '../ui/input';
import { Button } from '../ui/button';

interface IOrganismNewComerEventOrganizerDetailListProps {}

const OrganismNewComerEventOrganizerDetailList: React.FunctionComponent<IOrganismNewComerEventOrganizerDetailListProps> = () => {
    // For fetching
    const [items, setItems] = useState<NewComerEventOrganizerItem[]>([])    
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    // For state management
    const [page, setPage] = useState(1)
    const [search, setSearch] = useState<string>("")
    const [totalPage, setTotalPage] = useState(1)

    const fetchNewComer = async (page: number, search: string | null) => {
        try {
            const { data, meta } = await getNewComerEventOrganizerRepo(page, search)
            if(page > 1) {
                setItems(prev => [...prev, ...data])
            } else {
                setItems(data)
            }
            setTotalPage(meta.total_page)
        } catch (err: any) {
            if (err.response?.status === 404 && err.response?.data?.message) {
                setItems([])
                return []
            }

            setError(err?.response?.data?.message || "Something went wrong")
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchNewComer(page, search.length > 0 ? search : null)
    }, [page])

    // Search action
    const handleSearch = () => {
        setPage(1)
        fetchNewComer(1, search.length > 0 ? search : null)
    }

    return (
        <>
            <div className='flex flex-wrap gap-2 justify-between w-full mb-2'>
                <div>
                    <AtomText type='content-title' text='All Event Organizer' extraClass="text-primary font-bold"/>
                    <AtomText type='content' text='Support our local comunities!' extraClass='text-gray-400'/>
                </div>
                <div>
                    <AtomText type='content' text='Search transaction'/>
                    <Input type="text" placeholder="Search by event title or venue name" style={{minWidth:"340px"}}
                        value={search} onChange={(e) => setSearch(e.target.value)} onBlur={handleSearch}
                    />
                </div>
            </div>
            <div className='gap-4 w-full py-5 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4'>
                { error && <MoleculeNoDataBox title='Something went wrong'/> }
                { loading && <Skeleton className="h-[200px] w-full rounded-xl" /> }
                { 
                    !loading && !error && items && items.length > 0 ?
                        items.map((dt, idx) => <MoleculeNewComerEventOrganizerBox item={dt} key={idx} isFlexible={true}/>) 
                    :
                        <MoleculeNoDataBox title={'Event organizer not found'} color='gray' />
                }
            </div>
            {
                page < totalPage && 
                    <div className="mt-8 flex justify-center">
                        <Button variant="outline" className="h-11 rounded-xl border-gray-300 bg-white px-8" onClick={() => setPage(prev => prev + 1)} disabled={loading}>
                            {loading ? "Loading..." : "Load More Events Organizer"}
                        </Button>
                    </div>
            }
        </>
    )
}

export default OrganismNewComerEventOrganizerDetailList;
