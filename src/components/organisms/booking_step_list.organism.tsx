import * as React from 'react'
import AtomText from '../atoms/text.atom';
import MoleculeStepBox from '../molecules/step_box.molecule';
import { faCalendar, faCreditCard, faTicket } from '@fortawesome/free-solid-svg-icons';

interface IOrganismsBookingStepListProps {}

const OrganismsBookingStepList: React.FunctionComponent<IOrganismsBookingStepListProps> = () => {
    
    return (
        <div className="w-full mt-[10vh] p-5 pb-20 lg:p-10 lg:pb-40 text-center">
            <AtomText type='title-huge' text="Book events" extraClass='mb-0'/>
            <AtomText type='title-huge' text="was never this easy before" extraClass='text-primary'/>
            <div className="flex flex-wrap">
                <div className="w-full md:w-1/3 p-5">
                    <MoleculeStepBox icon={faCalendar} title="Find Your Event" description="Find the event you want to attend, fill out the guest form, and select the date." time={3}/>
                </div>
                <div className="w-full md:w-1/3 p-5">
                    <MoleculeStepBox icon={faCreditCard} title="Make a Transaction" description="Make a purchase. QR code and bank transfers are accepted." time={5}/>
                </div>
                <div className="w-full md:w-1/3 p-5">
                    <MoleculeStepBox icon={faTicket} title="Here's Your Ticket!" description="Your ticket will be sent to you, and you can enjoy the event." time={2}/>
                </div>
            </div>
            <AtomText type='content-title' text="It only takes 10 minutes 🤯" extraClass='text-primary'/>
        </div>
    )
}

export default OrganismsBookingStepList;
