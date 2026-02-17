"use client"
import * as React from 'react'
import AtomText from '../atoms/text.atom'
import { Button } from '../ui/button'
import Link from "next/link"

interface IOrganismAskJoinBoxProps {}

const OrganismAskJoinBox: React.FunctionComponent<IOrganismAskJoinBoxProps> = (props) => {
    
    return (
        <div className='text-center container mx-auto'>
            <div className='p-10 align-center'>
                <AtomText type='title-huge' text='Ready To Join An Event?' extraClass='mb-0'/>
                <AtomText type='content-title' text='Join thousands of happy users and don’t miss the chance to find unforgettable moments out there' extraClass='mb-10'/>
                <Link href={'/register'}>
                    <Button className='bg-primary'>Yes's Please</Button>
                </Link>
            </div>
        </div>
    )
}

export default OrganismAskJoinBox;
