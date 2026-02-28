import apiCall from "@/configs/axios"
import { EventOrganizerData, PaginationMeta, VenueData } from "./template"

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

interface CustomerItem {
    username: string 
    email: string 
    fullname: string
}
export interface EventAttendeeItem {
    fullname: string
    phone_number: string
    birth_date: string
    transaction: {
        customer: CustomerItem
        created_at: string
    }
}
export interface EventAttendeeWithMeta {
    data: EventAttendeeItem[]
    meta: PaginationMeta
}
export const getEventAttendeeByEventId = async (page: number, eventId: string, search: string | null): Promise<EventAttendeeWithMeta> => {
    const searchArgs = search ? `&search=${search}` : ''
    const res = await apiCall.get(`${MODULE_URL}/attendee/${eventId}?page=${page}${searchArgs}`)
    const { data, meta } = res.data

    return { data, meta }
}

export interface EventItem {
    id: string 
    event_organizer: EventOrganizerData
    event_title: string 
    event_desc: string 
    event_category: string
    event_price: number
    is_paid: boolean
    maximum_seat: number 
    event_pic: string 
    created_at: string
    event_schedule: EventScheduleData[]
}
export interface EventItemWithMeta {
    data: EventItem[]
    meta: PaginationMeta
}
export const getAllEvent = async (page: number, search: string | null): Promise<EventItemWithMeta> => {
    const searchArgs = search ? `&search=${search}` : ''
    const res = await apiCall.get(`${MODULE_URL}?page=${page}${searchArgs}`)
    const { data, meta } = res.data

    return { data, meta }
}

export interface EventDetailItem {
    id: string 
    event_title: string
    event_category: string 
    event_desc: string
    is_paid: boolean
    maximum_seat: number
    event_pic: string | null 
    event_price: number 
    event_organizer: EventOrganizerData
    event_schedule: EventScheduleData[]
    total_booked: number
    available_seat: number
}
export const getEventDetailByIdRepo = async (id: string): Promise<EventDetailItem> => {
    const res = await apiCall.get(`${MODULE_URL}/detail/${id}`)

    return res.data
}