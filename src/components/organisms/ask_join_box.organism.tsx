import * as React from 'react'
import AtomText from '../atoms/text.atom'
import { Button } from '../ui/button'
import Link from "next/link"

interface IOrganismAskJoinBoxProps {
    isSignedIn: boolean
}

const OrganismAskJoinBox: React.FunctionComponent<IOrganismAskJoinBoxProps> = ({ isSignedIn }) => {
    return (
        <div className='text-center container mx-auto'>
            <div className='p-3 md:p-6 lg:p-9 align-center'>
                <AtomText type='title-huge' text='Ready To Join An Event?' extraClass='mb-0'/>
                <AtomText type='content-title' text="Join thousands of happy users and don't miss the chance to find unforgettable moments out there" extraClass='mb-10'/>
                { isSignedIn && <AtomText type='content' text="Hey, it looks like you're already part of us!" extraClass='mb-2'/> }
                <Link href={ isSignedIn ? '/event' : '/register'}>
                    <Button className='bg-primary'>{ isSignedIn ? <>Browse Event Now!</> : <>Yes's Please!</> }</Button>
                </Link>
            </div>
        </div>
    )
}

export default OrganismAskJoinBox;
