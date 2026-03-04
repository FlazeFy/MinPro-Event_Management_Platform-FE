import apiCall from "@/configs/axios"
import { EventData, PaginationMeta } from "./template"
import { EventItem } from "./r_event"

const MODULE_URL = "/api/v1/event_organizers"

export interface NewComerEventOrganizerItem {
    id: string
    organizer_name: string
    bio: string
    created_at: string 
    profile_pic: string | null 
    total_event: number
    total_attendee: number
}
export interface EventAttendeeWithMeta {
    data: NewComerEventOrganizerItem[]
    meta: PaginationMeta
}
export const getNewComerEventOrganizerRepo = async (page: number, search: string | null): Promise<EventAttendeeWithMeta> => {
    const searchArgs = search ? `&search=${search}` : ''
    const res = await apiCall.get(`${MODULE_URL}/new_comer?page=${page}${searchArgs}`)
    const { data, meta } = res.data

    return { data, meta }
}

interface TrendingEventOrganizerItem {
    id: string 
    organizer_name: string 
    value: number
}
export interface TrendingEventOrganizerResponse {
    most_events: TrendingEventOrganizerItem
    most_free_event: TrendingEventOrganizerItem
    highest_average_price: TrendingEventOrganizerItem
    lowest_average_price: TrendingEventOrganizerItem
}
export const getTrendingEventOrganizer = async (): Promise<TrendingEventOrganizerResponse> => {
    const res = await apiCall.get(`${MODULE_URL}/trend`)

    return res.data.data
}

export interface EventOrganizerDetailItem {
    organizer_name: string
    email: string
    address: string | null
    phone_number: string
    bio: string
    created_at: string 
    profile_pic: string | null
    events: EventItem[]
    total_event: number
}
export interface EventOrganizerDetailWithMeta {
    data: EventOrganizerDetailItem
    meta: PaginationMeta
}
export const getEventOrganizerDetailByIdRepo = async (page: number, search: string | null, category: string | null, id: string): Promise<EventOrganizerDetailWithMeta> => {
    const searchArgs = search ? `&search=${search}` : ''
    const categoryArgs = category && category !== "all" ? `&category=${category}` : ''
    const res = await apiCall.get(`${MODULE_URL}/detail/${id}?page=${page}${searchArgs}${categoryArgs}`)
    const { data, meta } = res.data

    return { data, meta }
}