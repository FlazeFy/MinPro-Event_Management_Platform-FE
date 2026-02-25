'use client'
import React from 'react'
import AtomText from '../atoms/text.atom';
import { faCalendar, faCrown, faTag, faTicket } from '@fortawesome/free-solid-svg-icons';
import AtomDivider from '../atoms/divider.atom';
import MoleculeTrendingEventOrganizerBox from '../molecules/trending_event_organizer_box.molecule';

interface IOrganismTrendingEventOrganizerListProps {}

const OrganismTrendingEventOrganizerBox: React.FunctionComponent<IOrganismTrendingEventOrganizerListProps> = () => {
    return (
        <div className="container">
            <AtomText type='content-title' text='Trending EO'/>
            <AtomDivider/>
            <MoleculeTrendingEventOrganizerBox icon={faCalendar} label='Most Event' val='EO A' color='blue'/>
            <MoleculeTrendingEventOrganizerBox icon={faTicket} label='Most Free Event' val='EO A' color='yellow'/>
            <MoleculeTrendingEventOrganizerBox icon={faCrown} label='Highest Avg Price' val='EO A' color='red'/>
            <MoleculeTrendingEventOrganizerBox icon={faTag} label='Lowest Avg Price' val='EO A' color='green'/>
        </div>
    )
}

export default OrganismTrendingEventOrganizerBox;
