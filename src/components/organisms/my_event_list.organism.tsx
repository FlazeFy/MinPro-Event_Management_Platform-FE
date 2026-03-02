import React, { useEffect, useState } from 'react'
import AtomText from '../atoms/text.atom'
import MoleculeNoDataBox from '../molecules/no_data_box.molecule';
import Skeleton from 'react-loading-skeleton';
import { getMyEventRepo, MyEventData } from '@/repositories/r_event';
import MoleculeEventBox from '../molecules/event_box.molecule';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';

interface IOrganismMyEventListProps {}

const OrganismMyEventList: React.FunctionComponent<IOrganismMyEventListProps> = () => {
    // For fetching
    const [items, setItems] = useState<MyEventData[]>()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    // For state management
    const [page, setPage] = useState(1)
    const [search, setSearch] = useState<string>("")

    const fetchMyEvent = async (page: number, search: string | null) => {
        setLoading(true)
        try {
            const { data, meta } = await getMyEventRepo(page, search)
            setItems(data)
            setPage(meta.page)
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
        fetchMyEvent(page, search)
    }, [])

    // Search action
    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => fetchMyEvent(page, search.length > 0 ? search : null)

    return (
        <div className="box-bordered mb-5">
            <div className='flex flex-wrap gap-2 justify-between'>
                <AtomText type='sub-title-small' text='My Event '/>
                <div>
                    <AtomText type='content' text='Search transaction'/>
                    <div className='flex items-center gap-2'>
                        <Input type="text" placeholder="Search by event title or venue name" style={{minWidth:"340px"}}
                            value={search} onChange={(e) => setSearch(e.target.value)} onBlur={handleSearch}
                        />
                        <Link href={'/event/create'}>
                            <Button className='py-0 text-sm'><FontAwesomeIcon icon={faCalendar}/>Add Event</Button> 
                        </Link>
                    </div>
                </div>
            </div>
            <div className={!loading && !error && items && items.length > 0 ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-3" : ""}>
                { error && <MoleculeNoDataBox title='Something went wrong'/> }
                { loading && <Skeleton className="h-[200px] w-full rounded-xl" /> }
                {
                    !loading && !error && items && items.length > 0 ?
                        items.map((dt, idx) => (
                            <MoleculeEventBox event={dt} key={idx} isMyEventOnly={true} role='event_organizer'/>
                        ))
                    :
                        <MoleculeNoDataBox title={'Event not found'} color='gray'/>
                }
            </div>
        </div>
    )
}

export default OrganismMyEventList;
