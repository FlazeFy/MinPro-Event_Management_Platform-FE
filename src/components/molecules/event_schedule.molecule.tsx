import React from "react";
import AtomText from "../atoms/text.atom";
import { CalendarDays, Clock3, MapPin } from "lucide-react";

interface ScheduleItem {
    day: string
    date: string
    time: string
    location: string
}

interface MoleculeEventScheduleProps {
    title?: string
    schedule?: ScheduleItem[]
}

const defaultSchedule: ScheduleItem[] = [
    {
        day: "Day 1",
        date: "Friday, March 21, 2026",
        time: "09:00 AM - 05:00 PM",
        location: "Moscone Center, San Francisco",
    },
    {
        day: "Day 2",
        date: "Saturday, March 22, 2026",
        time: "09:00 AM - 05:00 PM",
        location: "Moscone Center, San Francisco",
    },
    {
        day: "Day 3",
        date: "Sunday, March 23, 2026",
        time: "09:00 AM - 03:00 PM",
        location: "Moscone Center, San Francisco",
    },
];

const MoleculeEventSchedule: React.FC<MoleculeEventScheduleProps> = ({title = "Event Schedule", schedule = defaultSchedule}) => {
    return (
        <section className="w-full mt-10">
            <AtomText
                type="content-title"
                text={title}
                extraClass="text-2xl md:text-3xl font-semibold text-primary mb-4"
            />
            <div className="flex flex-col gap-4">
                {schedule.map((item) => (
                    <div
                        key={`${item.day}-${item.date}`}
                        className="rounded-2xl border border-secondary/20 bg-secondary/5 p-5 md:p-6"
                    >
                        <AtomText
                            type="sub-title-small"
                            text={item.day}
                            extraClass="text-lg font-semibold text-primary"
                        />
                        <div className="mt-3 flex flex-col gap-2">
                            <div className="flex items-center gap-2 text-gray-700">
                                <CalendarDays className="w-4 h-4 text-primary" />
                                <AtomText type="content" text={item.date} />
                            </div>
                            <div className="flex items-center gap-2 text-gray-700">
                                <Clock3 className="w-4 h-4 text-primary" />
                                <AtomText type="content" text={item.time} />
                            </div>
                            <div className="flex items-center gap-2 text-gray-700">
                                <MapPin className="w-4 h-4 text-primary" />
                                <AtomText type="content" text={item.location} />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    )
}

export default MoleculeEventSchedule
