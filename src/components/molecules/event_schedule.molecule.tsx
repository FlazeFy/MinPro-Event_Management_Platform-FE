import React from "react";
import AtomText from "../atoms/text.atom";
import { EventScheduleData } from "@/repositories/template";
import { convertUTCToLocal } from "@/helpers/converter.helper";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot, faMap, faCalendar } from "@fortawesome/free-solid-svg-icons";
import { Button } from "../ui/button";

const MoleculeEventSchedule: React.FC<EventScheduleData> = ({ start_date, end_date, venue }) => {
    return (
        <div className="w-full mt-10 flex flex-wrap justify-between items-center text-start border border-gray-300 p-5 rounded-xl gap-5 md:gap-2">
            <div>
                <AtomText text={<><FontAwesomeIcon icon={faCalendar}/> Start At</>} type='content-title' extraClass="text-primary"/>
                <AtomText type="content" text={`${convertUTCToLocal(start_date)} - ${convertUTCToLocal(end_date)}`}/>
            </div>
            <div>
                <AtomText text={<><FontAwesomeIcon icon={faLocationDot}/> Venue</>} type='content-title' extraClass="text-primary"/>
                <AtomText type="content" text={venue.venue_name}/>
                <AtomText type="content" text={venue.venue_address} extraClass="text-gray-400 italic"/>
            </div>
            <a href={`https://www.google.com/maps/dir/?api=1&origin=Current+Location&destination=${venue.venue_coordinate}`} target="_blank" rel="noopener noreferrer" className="w-full md:w-auto">
                <Button className="w-full md:w-auto"><FontAwesomeIcon icon={faMap} /> Set Direction</Button>
            </a>
        </div>
    )
}

export default MoleculeEventSchedule
