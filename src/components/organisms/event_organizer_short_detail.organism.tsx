import * as React from 'react'
import AtomText from '../atoms/text.atom'
import { Button } from '../ui/button'
import Link from "next/link"
import MoleculeShortProfileBox from '../molecules/short_profile_box.molecule'
import { EventOrganizerData } from '@/repositories/template'
import AtomDivider from '../atoms/divider.atom'

const OrganismsEventOrganizerShortDetail: React.FunctionComponent<EventOrganizerData> = ({ id, bio, organizer_name }) => {
    return (
        <div className='text-start container mx-auto align-center'>
            <AtomText type='content-title' text='About Organizer' extraClass='mb-4'/>
            <MoleculeShortProfileBox title={organizer_name}/>
            <AtomText text={bio} type='content' extraClass='text-sm'/>
            <AtomDivider/>
            <Link href={`/event_organizer/${id}`}>
                <Button>Profile</Button>
            </Link>
        </div>
    )
}

export default OrganismsEventOrganizerShortDetail;
