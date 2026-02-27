"use client"
import * as React from 'react'
import AtomText from '../atoms/text.atom'
import { Button } from '../ui/button'
import Link from "next/link"
import MoleculeShortProfileBox from '../molecules/short_profile_box.molecule'

interface IOrganismsEventOrganizerShortDetailProps { }

const OrganismsEventOrganizerShortDetail: React.FunctionComponent<IOrganismsEventOrganizerShortDetailProps> = (props) => {
    return (
        <div className='text-center container mx-auto'>
            <div className='p-10 align-center'>
                <AtomText type='sub-title-small' text='Organizer Details' extraClass='mb-0 text-xl' />
                <MoleculeShortProfileBox
                    image=''
                    title='Nexus Events'
                    description='Technology Event Organizer'
                />
                <div className='flex gap-2'>
                    <Button>Contact</Button>
                    <Button>Profile</Button>
                </div>
            </div>
        </div>
    )
}

export default OrganismsEventOrganizerShortDetail;
