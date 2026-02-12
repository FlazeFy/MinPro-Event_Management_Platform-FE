import * as React from 'react'
import AtomText from '../atoms/text.atom'
import { faCalendar, faBell, faUsers, faLineChart } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Button } from '../ui/button'
import Image from "next/image"

interface IOrganismsBenefitBoxProps {}

const OrganismsBenefitBox: React.FunctionComponent<IOrganismsBenefitBoxProps> = () => {
    
    return (
        <div className="flex flex-wrap w-full mt-[10vh] p-5 pb-20 lg:p-10 lg:pb-40 items-center">
            <div className="w-full md:w-1/2 flex justify-center items-center relative h-[400px] pr-20">
                <Image src="/images/event.jpg" alt="/images/event.jpg" width={1200} height={800} className="w-full h-auto rounded-2xl shadow-2xl" style={{ transform: "rotate(-5deg)" }}/>
            </div>
            <div className="w-full md:w-1/2 text-left">
                <AtomText type='title-huge' text='Planning on the Go?' extraClass='mb-0'/>
                <AtomText type='title-huge' text="Dont't worry" extraClass='text-primary'/>
                <div className='flex justify-start items-center gap-4 mb-3'>
                    <Button variant='outline' className='bg-secondary'>
                        <FontAwesomeIcon icon={faCalendar}/>
                    </Button>
                    <div>
                        <AtomText type='content-title' text="Event Reminder"/>
                        <AtomText type='content' text="Get notified before your event starts and never miss important moments" extraClass='italic text-gray-500'/>
                    </div>
                </div>
                <div className='flex justify-start items-center gap-4 mb-3'>
                    <Button variant='outline' className='bg-warning'>
                        <FontAwesomeIcon icon={faBell}/>
                    </Button>
                    <div>
                        <AtomText type='content-title' text="Promo & Trending Alerts"/>
                        <AtomText type='content' text="Stay updated with exclusive discounts and trending events near you" extraClass='italic text-gray-500'/>
                    </div>
                </div>
                <div className='flex justify-start items-center gap-4 mb-3'>
                    <Button variant='outline' className='bg-danger'>
                        <FontAwesomeIcon icon={faUsers}/>
                    </Button>
                    <div>
                        <AtomText type='content-title' text="One Transaction For All"/>
                        <AtomText type='content' text="Book tickets for friends and family in a single transaction" extraClass='italic text-gray-500'/>
                    </div>
                </div>
                <div className='flex justify-start items-center gap-4 mb-3'>
                    <Button variant='outline' className='bg-success'>
                        <FontAwesomeIcon icon={faLineChart}/>
                    </Button>
                    <div>
                        <AtomText type='content-title' text="Insightful Analytics"/>
                        <AtomText type='content' text="Track event performance, ticket sales trends, and audience engagement in real-time" extraClass='italic text-gray-500'/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default OrganismsBenefitBox;
