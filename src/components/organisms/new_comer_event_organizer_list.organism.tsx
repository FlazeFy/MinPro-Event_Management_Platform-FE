'use client'
import React from 'react'
import AtomText from '../atoms/text.atom';
import { Button } from '../ui/button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import MoleculeNewComerEventOrganizerBox from '../molecules/new_comer_event_organizer_box.molecule';

interface IOrganismNewComerEventOrganizerListProps {}

const OrganismNewComerEventOrganizerList: React.FunctionComponent<IOrganismNewComerEventOrganizerListProps> = () => {
    return (
        <>
            <div className='flex flex-wrap gap-2 justify-between w-full mb-2    '>
                <div>
                    <AtomText type='content-title' text='New Comer Event Organizer'/>
                    <AtomText type='content' text='...'/>
                </div>
                <Button><FontAwesomeIcon icon={faArrowRight}/> See More</Button>
            </div>
            <div className='flex gap-2 flex-col'>
                <MoleculeNewComerEventOrganizerBox/>
            </div>
        </>
    )
}

export default OrganismNewComerEventOrganizerList;
