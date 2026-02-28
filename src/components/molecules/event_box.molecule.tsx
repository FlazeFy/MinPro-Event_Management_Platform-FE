import React from 'react'
import AtomText from '../atoms/text.atom'
import Link from 'next/link'
import { Button } from '../ui/button'
import { EventItem } from '@/repositories/r_event'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendar, faLocationDot, faUsers } from '@fortawesome/free-solid-svg-icons'
import { Badge } from '../ui/badge'
import Image from 'next/image'
import { convertUTCToLocal } from '@/helpers/converter.helper'
import { faUser } from '@fortawesome/free-regular-svg-icons'

interface MoleculeEventBoxProps {
    event: EventItem
}

const MoleculeEventBox: React.FC<MoleculeEventBoxProps> = ({ event }) => {
    return (
        <div className="min-w-0 flex-[0_0_100%] pl-2 md:flex-[0_0_50%] xl:flex-[0_0_33.3333%]">
            <article className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-[0_2px_12px_rgba(15,23,42,0.05)]">
                <div className="relative h-40 w-full">
                    <Image src={event.event_pic ?? '/images/event.jpg'} alt={event.event_pic ?? '/images/event.jpg'} fill className="object-cover" sizes="(min-width: 1280px) 360px, (min-width: 768px) 50vw, 100vw" />
                    <span className="absolute right-3 top-3 rounded-lg bg-[#eef0ff] px-3 py-1 text-sm font-semibold text-primary"><FontAwesomeIcon icon={faUser}/> {event.event_organizer.organizer_name}</span>
                </div>
                <div className="space-y-4 p-4">
                    <div className="text-xs font-semibold uppercase tracking-wide text-gray-400">
                        {event.event_category.replaceAll("_"," ")}<span className="mx-2 text-gray-300">|</span><span className="normal-case text-gray-500"><FontAwesomeIcon icon={faUsers}/> {event.maximum_seat}</span>
                    </div>
                    <AtomText type="content-title" text={event.event_title} extraClass="text-[28px] leading-tight font-semibold text-slate-800" />
                    <div className="flex flex-wrap gap-2">
                        <Badge><FontAwesomeIcon icon={faCalendar}/>{convertUTCToLocal(event.event_schedule[0].start_date)}</Badge>
                        <Badge><FontAwesomeIcon icon={faLocationDot}/>{event.event_schedule[0].venue.venue_name}</Badge>
                    </div>
                    <Link href={`/event/${event.id}}`}>
                        <Button className="w-full rounded-xl bg-success">Book Ticket</Button>
                    </Link>
                </div>
            </article>
        </div>
    )
}

export default MoleculeEventBox