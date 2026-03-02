'use client'
import React, { useState, useEffect } from 'react'
import AtomText from '../atoms/text.atom';
import { Button } from '../ui/button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import MoleculeNewComerEventOrganizerBox from '../molecules/new_comer_event_organizer_box.molecule';
import { getNewComerEventOrganizerRepo, NewComerEventOrganizerItem } from '@/repositories/r_event_organizer';
import Skeleton from 'react-loading-skeleton';
import MoleculeNoDataBox from '../molecules/no_data_box.molecule';

interface IOrganismNewComerEventOrganizerListProps {}

const OrganismNewComerEventOrganizerList: React.FunctionComponent<IOrganismNewComerEventOrganizerListProps> = () => {
    const [item, setItem] = useState<NewComerEventOrganizerItem[]>()
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    const fetchNewComer = async () => {
        try {
            const data = await getNewComerEventOrganizerRepo(1, null)
            setItem(data)
        } catch (err: any) {
            setError(err?.response?.data?.message || "Something went wrong")
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchNewComer()
    }, [])

    if (loading) return <Skeleton style={{height:"400px"}}/>
    if (error) return <MoleculeNoDataBox title="Something went wrong" style={{height:"400px"}}/>
    if (!item) return <MoleculeNoDataBox title={`There's no new event organizer for past 30 days`} style={{height:"400px"}} color='gray'/>

    return (
        <>
            <div className='flex flex-wrap gap-2 justify-between w-full mb-2'>
                <div>
                    <AtomText type='content-title' text='New Comer Event Organizer' extraClass="text-primary font-bold"/>
                    <AtomText type='content' text='These organizers are just getting started, show them some support!' extraClass='text-gray-400'/>
                </div>
                <Button><FontAwesomeIcon icon={faArrowRight}/> See More</Button>
            </div>
            <div className='flex gap-2 overflow-x-auto w-full py-5'>
                { item.map((dt, idx) => <MoleculeNewComerEventOrganizerBox item={dt} key={idx}/>) }
            </div>
        </>
    )
}

export default OrganismNewComerEventOrganizerList;
