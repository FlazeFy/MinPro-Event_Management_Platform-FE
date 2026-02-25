import React from 'react'
import AtomText from '../atoms/text.atom';
import MoleculeUpcomingEventBox from '../molecules/upcoming_event_box.molecule';

interface IOrganismUpcomingEventListProps {
    role: string
}

const OrganismUpcomingEventList: React.FunctionComponent<IOrganismUpcomingEventListProps> = ({ role }) => {
    return (
        <div className="bg-gray-100 p-10 rounded-2xl">
            <AtomText type='content-title' text='Upcoming Events'/>
            <div>
                <MoleculeUpcomingEventBox/>
            </div>
        </div>
    )
}

export default OrganismUpcomingEventList;
