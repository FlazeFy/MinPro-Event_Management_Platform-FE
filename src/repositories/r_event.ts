import apiCall from "@/configs/axios"
import {  PaginationMeta, VenueData } from "./template"

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

export interface EventScheduleData {
    start_date: string
    end_date: string
    venue: VenueData
}
export interface RecentEventData {
    id: string
    event_title: string
    event_desc: string
    event_category: string
    event_price: number
    is_paid: boolean
    maximum_seat: number
    created_at: string
    event_schedule: EventScheduleData[]
    total_revenue: number
    total_booked_seat: number
}
export interface AllRecentEventResponse {
    data: RecentEventData[]
    meta: PaginationMeta
}
export const getRecentEventRepo = async (page: number, search: string | null): Promise<AllRecentEventResponse> => {
    const searchArgs = search ? `&search=${search}` : ''
    const res = await apiCall.get(`${MODULE_URL}/recent?page=${page}${searchArgs}`)
    
    return res.data
}