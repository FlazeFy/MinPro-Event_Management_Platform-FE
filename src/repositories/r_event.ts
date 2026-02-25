import apiCall from "@/configs/axios"
import {  VenueData } from "./template"

const MODULE_URL = "/api/v1/events"

export interface EventHeaderData {
    id: string
    event_title: string
    event_category: string
    maximum_seat: number
    total_profit: number 
    total_seat_remaining: number
}
export interface UpcomingEventItem {
    start_date: string 
    end_date: string
    venue: VenueData
    event: EventHeaderData
}
export const getUpcomingEventRepo = async (): Promise<UpcomingEventItem[]> => {
    const res = await apiCall.get(`${MODULE_URL}/upcoming`)
    
    return res.data.data
}