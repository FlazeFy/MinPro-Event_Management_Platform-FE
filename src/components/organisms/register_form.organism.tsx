'use client'
import * as React from 'react'
import AtomText from '../atoms/text.atom'
import OrganismRegisterCustomerForm from './register_customer_form.organism'
import { Button } from '../ui/button'
import OrganismRegisterEventOrganizerForm from './register_event_organizer_form.organism'
import Image from 'next/image'

interface IOrganismRegisterFormProps {}

type RegisterType = "customer" | "event organizer"

const OrganismRegisterForm: React.FunctionComponent<IOrganismRegisterFormProps> = () => {
    const [registerType, setRegisterType] = React.useState<RegisterType>("customer")
    const isCustomer = registerType === "customer"

    return (
        <div className="box-bordered w-[1080px]">
            <AtomText type="title" text="Welcome to EventKu" extraClass="mb-0"/>
            <AtomText type="sub-title-small" text="Create your account and start your journey 😉"/>
            <hr className="mt-2 mb-6"/>
            <div className="flex flex-wrap w-full mt-2">
                <div className="w-full md:w-1/2 px-5 bg-gray-100 rounded-2xl">
                    { 
                        registerType === "customer" ? 
                            <div className='text-center'>
                                <Image src={`/images/${registerType}.png`} alt={`/images/${registerType}.jpg`} width={1200} height={800} className="w-full h-auto mb-10"/>
                                <AtomText type="content-title" text={registerType} extraClass='capitalize'/>
                                <AtomText type='content' text='Discover exciting upcoming events, explore experiences that match your interests, and build meaningful connections wherever you go.'/>
                            </div>
                            :  
                            <div className='text-center'>
                                <Image src={`/images/${registerType}.png`} alt={`/images/${registerType}.jpg`} width={1200} height={800} className="w-full h-auto mb-10"/>
                                <AtomText type="content-title" text={registerType} extraClass='capitalize'/>
                                <AtomText type='content' text='Host unforgettable events, gather amazing people, and become the most sought-after event organizer in town, where every event you create is highly anticipated and remembered.'/>
                            </div>
                    }
                </div>
                <div className="w-full md:w-1/2 px-5">
                    <div className="mb-8">
                        <AtomText type="content" text={<>I'm registering as a <b>{registerType}</b></>}/>
                        <div className="grid grid-cols-1 md:grid-cols-6 gap-x-5 w-full mt-2">
                            <div className="col-span-1 md:col-span-3">
                                <Button onClick={() => setRegisterType("customer")}
                                    className={`relative w-full py-2 rounded-lg ${isCustomer ? "text-blue-600" : "text-gray-500"}`}>Customer</Button>
                            </div>
                            <div className="col-span-1 md:col-span-3">
                                <Button onClick={() => setRegisterType("event organizer")}
                                    className={`relative w-full py-2 rounded-lg ${!isCustomer ? "text-blue-600" : "text-gray-500"}`}>Event Organizer</Button>
                            </div>
                        </div>
                    </div>
                    { registerType === "customer" ? <OrganismRegisterCustomerForm/> : <OrganismRegisterEventOrganizerForm/> }
                </div>
            </div>
        </div>
    )
}

export default OrganismRegisterForm