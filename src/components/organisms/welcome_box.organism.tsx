import * as React from 'react'
import AtomText from '../atoms/text.atom'
import { Button } from '../ui/button'
import Link from "next/link"

interface IOrganismWelcomeBoxProps {}

const OrganismWelcomeBox: React.FunctionComponent<IOrganismWelcomeBoxProps> = (props) => {
    return (
        <div>
            <AtomText type='title-huge' text='Join' extraClass='mb-0'/>
            <AtomText type='title-huge' text='Unforgettable' extraClass='text-primary'/>
            <AtomText type='title-huge' text='Events with Ease'/>
            <AtomText type='content-title' text='Explore trending events, secure your tickets instantly, and create unforgettable memories with EventKu'/>
            <div className='my-5 flex gap-2'>
                <Link href={'/register'}>
                    <Button className='bg-secondary'>Get Started Free</Button>
                </Link>
                <Link href={'/events'}>
                    <Button>Browse Event For Now</Button>
                </Link>
            </div>
            <AtomText type='content' text="Over 1,000 Events and 6,500+ Transactions Completed" extraClass='italic text-gray-500'/>
        </div>
    )
}

export default OrganismWelcomeBox;
