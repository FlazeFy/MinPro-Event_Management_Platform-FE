'use client'
import React, { useEffect, useState } from 'react'
import MoleculeNoDataBox from '../molecules/no_data_box.molecule'
import Skeleton from 'react-loading-skeleton'
import { VenueData } from '@/repositories/template'
import MoleculeVenueBox from '../molecules/venue_box.molecule'
import AtomText from '../atoms/text.atom'
import { getAllVenueRepo } from '@/repositories/r_venue'

interface IOrganismSelectVenueProps {
    selectedVenue: string | null
    setSelectedVenue: (id: string) => void
}

const OrganismSelectVenue: React.FunctionComponent<IOrganismSelectVenueProps> = ({ selectedVenue, setSelectedVenue }) => {
    // For fetching
    const [items, setItems] = useState<VenueData[]>()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    // For state management
    const [page, setPage] = useState(0)

    const fetchAllVenue = async (page: number, search: string | null) => {
        setLoading(true)
        try {
            const { data, meta } = await getAllVenueRepo(page, search)
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
        fetchAllVenue(page, null)
    }, [])

    const handleSelectVenue = (id: string) => setSelectedVenue(id)

    return (
        <div>
            <AtomText type='content-title' text='Available Venue' extraClass='mb-2'/>
            { error && <MoleculeNoDataBox title='Something went wrong'/> }
            { loading && <Skeleton className="h-[200px] w-full rounded-xl" /> }
            {
                !loading && !error && items && items.length > 0 ?
                    items.map((dt, idx) => <MoleculeVenueBox key={dt.id} venue={dt} action={() => handleSelectVenue(dt.id)} selected={selectedVenue === dt.id}/>)
                :
                    <MoleculeNoDataBox title={'No venue found'} color='gray'/>
            }
        </div>
    )
}

export default OrganismSelectVenue;
