import * as React from 'react'
import AtomText from '../atoms/text.atom'
import { faCalendar, faBell, faLineChart, faUser } from '@fortawesome/free-solid-svg-icons'
import Image from "next/image"
import MoleculeBenefitBox from '../molecules/benefit_box.molecule'

interface IOrganismBenefitListProps {}

const OrganismBenefitList: React.FunctionComponent<IOrganismBenefitListProps> = () => {
    return (
        <div className="flex flex-wrap w-full mt-[10vh] p-5 pb-20 lg:p-10 lg:pb-40 items-center" id='feature-section'>
            <div className="w-full md:w-1/2 flex justify-center items-center relative h-[400px] pr-20">
                <Image src="/images/event.jpg" alt="/images/event.jpg" width={1200} height={800} className="w-full h-auto rounded-2xl shadow-2xl" style={{ transform: "rotate(-5deg)" }}/>
            </div>
            <div className="w-full md:w-1/2 text-left">
                <AtomText type='title-huge' text='Planning on the Go?' extraClass='mb-0'/>
                <AtomText type='title-huge' text="Dont't worry" extraClass='text-primary'/>
                <MoleculeBenefitBox icon={faCalendar} title='Event Reminder' description='Get notified before your event starts and never miss important moments'/>
                <MoleculeBenefitBox icon={faBell} title='Promo & Trending Alerts' description='Stay updated with exclusive discounts and trending events near you'/>
                <MoleculeBenefitBox icon={faUser} title='One Transaction For All' description='Book tickets for friends and family in a single transaction'/>
                <MoleculeBenefitBox icon={faLineChart} title='Insightful Analytics' description='Track event performance, ticket sales trends, and audience engagement in real-time'/>
            </div>
        </div>
    )
}

export default OrganismBenefitList;
