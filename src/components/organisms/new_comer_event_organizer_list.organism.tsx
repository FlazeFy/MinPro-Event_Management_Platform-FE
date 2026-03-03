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
import Link from 'next/link';

interface IOrganismNewComerEventOrganizerListProps {}

const OrganismNewComerEventOrganizerList: React.FunctionComponent<IOrganismNewComerEventOrganizerListProps> = () => {
    const [item, setItem] = useState<NewComerEventOrganizerItem[]>()
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    const fetchNewComer = async () => {
        try {
            const data = await getNewComerEventOrganizerRepo(1, null)
            setItem(data.data)
        } catch (err: any) {
            setError(err?.response?.data?.message || "Something went wrong")
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchNewComer()
    }, [])

    return (
        <>
            <div className='flex flex-wrap gap-2 justify-between w-full mb-2'>
                <div>
                    <AtomText type='content-title' text='New Comer Event Organizer' extraClass="text-primary font-bold"/>
                    <AtomText type='content' text='These organizers are just getting started, show them some support!' extraClass='text-gray-400'/>
                </div>
                <Link href="/event_organizer">
                    <Button><FontAwesomeIcon icon={faArrowRight}/> See More</Button>
                </Link>
            </div>
            <div className='flex gap-2 overflow-x-auto w-full py-5'>
                { error && <MoleculeNoDataBox title='Something went wrong'/> }
                { loading && <Skeleton className="h-[200px] w-full rounded-xl" /> }
                { 
                    !loading && !error && item && item.length > 0 ?
                        item.map((dt, idx) => <MoleculeNewComerEventOrganizerBox item={dt} key={idx}/>) 
                    :
                        <MoleculeNoDataBox title={'Event organizer not found'} color='gray'/>
                }
            </div>
        </>
    )
}

export default OrganismNewComerEventOrganizerList;
