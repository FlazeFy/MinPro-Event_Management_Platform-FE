'use client'
import React, { useEffect, useState } from 'react'
import AtomText from '../atoms/text.atom'
import { Button } from '../ui/button'
import Link from "next/link"
import { AppsSummaryData, getAppsSummaryRepo } from '@/repositories/r_stats'
import Skeleton from 'react-loading-skeleton'
import MoleculeNoDataBox from '../molecules/no_data_box.molecule'

interface IOrganismWelcomeBoxProps {
    isSignedIn: boolean
    name: string
}

const OrganismWelcomeBox: React.FunctionComponent<IOrganismWelcomeBoxProps> = ({ isSignedIn, name }) => {
    // For fetching
    const [item, setItem] = useState<AppsSummaryData>()
    const [error, setError] = useState<string | null>()
    const [loading, setLoading] = useState<boolean>(false)

    const fetchAppSummary = async () => {
        try {
            setLoading(true)
            const data = await getAppsSummaryRepo()
            setItem(data)
        } catch (err: any) {
            setError(err?.response?.data?.message || "Something went wrong")
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchAppSummary()
    }, [])

    return (
        <div className='text-center lg:text-start'>
            {
                isSignedIn ? 
                    <>
                        <AtomText type='title-huge' text='Welcome' extraClass='mb-0'/>
                        <AtomText type='title-huge' text={name} extraClass='text-primary'/>
                    </>
                : 
                    <>
                        <AtomText type='title-huge' text='Join' extraClass='mb-0'/>
                        <AtomText type='title-huge' text='Unforgettable' extraClass='text-primary'/>
                        <AtomText type='title-huge' text='Events with Ease'/>
                    </>
            }
            <AtomText type='content-title' text='Explore trending events, secure your tickets instantly, and create unforgettable memories with EventKu'/>
            <div className='my-5 flex gap-2 flex justify-center lg:justify-start'>
                {
                    !isSignedIn &&
                        <Link href={'/register'}>
                            <Button className='bg-secondary'>Get Started Free</Button>
                        </Link>
                }
                <Link href={'/event'}>
                    <Button>Browse Event Now</Button>
                </Link>
            </div>
            { loading && <Skeleton className="h-[20px] w-full rounded-xl"/> }
            { !loading && error && <MoleculeNoDataBox title='Something went wrong'/> }
            { !loading && item && <AtomText type='content' text={`Over ${item.total_event.toLocaleString()} Events and ${item.total_transaction.toLocaleString()} Transactions Completed`} extraClass='italic text-gray-500 mb-20 md:mb-0'/> }
        </div>
    )
}

export default OrganismWelcomeBox;
