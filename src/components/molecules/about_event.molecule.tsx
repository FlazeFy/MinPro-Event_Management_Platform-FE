import React from 'react';
import { Button } from '../ui/button';
import AtomText from '../atoms/text.atom';
import MoleculeShortProfileBox from './short_profile_box.molecule';
import { Star } from 'lucide-react';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';
import { EventDetailItem } from '@/repositories/r_event';

const MoleculeAboutEvent: React.FC<EventDetailItem> = ({ event_pic, event_category, event_title, event_organizer, event_desc, transactions }) => {
    let reviews = 0
    let totalRate = 0

    for (const transaction of transactions ?? []) {
        console.log(transaction)

        if (!transaction.reviews?.length) continue

        for (const review of transaction.reviews) {
            reviews++
            totalRate += review.review_rate
        }
    }

    const rating = reviews > 0 ? Math.floor(totalRate / reviews) : 0

    return (
        <div className="flex flex-col gap-6 w-full">
            <div className="relative w-full h-75 md:h-100 rounded-2xl overflow-hidden">
                <Image src={event_pic ?? '/images/event.jpg'} alt={event_pic ?? '/images/event.jpg'} fill className="object-cover"/>
                <div className="absolute top-4 left-4 flex gap-2 z-10">
                    <Link href='/event'>
                        <Button variant="secondary" className="bg-white/90 bg-danger hover:bg-white rounded-full text-xs font-semibold px-4">
                            <FontAwesomeIcon icon={faArrowLeft}/> Back
                        </Button>
                    </Link>
                </div>
                <div className="absolute inset-0 bg-linear-to-t from-black/20 to-transparent pointer-events-none" />
            </div>
            <div>
                <AtomText type="title-huge" text={event_title} extraClass="text-3xl md:text-5xl font-bold text-primary mb-4" />
                <div className="flex flex-col md:flex-row gap-6 md:items-center mt-4 justify-between">
                    <div className="min-w-50">
                        <MoleculeShortProfileBox title={event_organizer.organizer_name} image={event_organizer.profile_pic}/>
                    </div>
                    <div className="flex items-center gap-3 bg-secondary/10 px-4 py-2 rounded-full border border-secondary/20">
                        <Star className="w-5 h-5 fill-primary text-primary" />
                        <div className="flex items-baseline gap-1">
                            <span className="text-xl font-bold text-primary">{rating}</span>
                            <span className="text-sm text-gray-500">({reviews} Reviews)</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="mt-4 space-y-3">
                <AtomText type="content-title" text="About the Event" extraClass="text-2xl font-semibold flex items-center gap-2" />
                <div className="text-gray-600 leading-relaxed text-lg">
                    <AtomText type="content" text={event_desc}/>
                </div>
            </div>
        </div>
    );
};

export default MoleculeAboutEvent;
