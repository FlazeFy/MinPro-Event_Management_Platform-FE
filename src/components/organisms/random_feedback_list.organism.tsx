'use client'
import React, { useEffect, useState } from 'react'
import AtomText from '../atoms/text.atom';
import MoleculeFeedbackBox from '../molecules/feedback_box.molecule';
import { FeedbackItem, getRandomFeedbackRepo } from '@/repositories/r_feedback';
import Skeleton from 'react-loading-skeleton';
import MoleculeNoDataBox from '../molecules/no_data_box.molecule';

interface IOrganismRandomFeedbackListProps {}

const OrganismRandomFeedbackList: React.FunctionComponent<IOrganismRandomFeedbackListProps> = () => {
    const [item, setItem] = useState<FeedbackItem[]>()
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const fetchRandomFeedback = async () => {
            try {
                const data = await getRandomFeedbackRepo()
                setItem(data)
            } catch (err: any) {
                setError(err?.response?.data?.message || "Something went wrong")
            } finally {
                setLoading(false)
            }
        }

        fetchRandomFeedback()
    },[])

    return (
        <div className="w-full mt-[10vh] p-5 pb-20 lg:p-10 lg:pb-40 text-center">
            <AtomText type='title-huge' text="What people say about us" extraClass='mb-10'/>
            {
                error ? <MoleculeNoDataBox title={'Something went wrong'}/>
                :
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        { loading && <Skeleton className="h-[200px] w-full rounded-xl"/> }
                        {
                            !loading && !error && item?.map((dt, idx) => <MoleculeFeedbackBox key={idx} name={dt.customer ? dt.customer.username : dt.event_organizer.organizer_name} feedback={dt.feedback_body} rate={dt.feedback_rate} idx={idx}/>)
                        }
                    </div>
            }
            <AtomText type='content-title' text="Join us, and share your experience too" extraClass='text-primary'/>
        </div>
    )
}

export default OrganismRandomFeedbackList;
