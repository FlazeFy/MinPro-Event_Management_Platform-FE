import apiCall from "@/configs/axios"
import { EventOrganizerData, PaginationMeta, UserShortInfo, VenueData } from "./template"

const MODULE_URL = "/api/v1/events"

interface AttendeeUpcomingEvent {
    attendees: UserShortInfo[]
}
export interface EventHeaderData {
    id: string
    event_title: string
    event_category: string
    maximum_seat: number
    total_profit: number 
    total_seat_remaining: number
    transactions: AttendeeUpcomingEvent[]
}
export interface UpcomingEventItem {
    id: string
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
    max_price: {
        _max: {
            event_price: number
        }
    }
}
export const getAllEvent = async (page: number, search: string | null, category: string | null, price: number | null): Promise<EventItemWithMeta> => {
    const searchArgs = search ? `&search=${search}` : ''
    const categoryArgs = category && category !== "all" ? `&category=${category}` : ''
    const priceArgs = price ? `&price=${price}` : ''
    const res = await apiCall.get(`${MODULE_URL}?page=${page}${searchArgs}${categoryArgs}${priceArgs}`)
    const { data, meta, max_price } = res.data

    return { data, meta, max_price }
}

export interface ReviewItem {
    review_body: string 
    review_rate: number 
    created_at: string
}
export interface TransactionReviewItem {
    customer: UserShortInfo
    reviews: ReviewItem[]
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
    transactions: TransactionReviewItem[]
}
export const getEventDetailByIdRepo = async (id: string): Promise<EventDetailItem> => {
    const res = await apiCall.get(`${MODULE_URL}/detail/${id}`)

    return res.data.data
}

export interface MyEventData {
    id: string
    event_title: string
    event_desc: string
    event_category: string
    event_price: number
    is_paid: boolean
    maximum_seat: number
    created_at: string
    event_schedule: EventScheduleData[]
    total_booked: number
    event_pic: string | null
}
export interface MyEventResponse {
    data: MyEventData[]
    meta: PaginationMeta
}
export const getMyEventRepo = async (page: number, search: string | null): Promise<MyEventResponse> => {
    const searchArgs = search ? `&search=${search}` : ''
    const res = await apiCall.get(`${MODULE_URL}/my?page=${page}${searchArgs}`)
    
    return res.data
}

interface PostEventPayload {
    event_title: string
    event_desc: string
    event_category: any
    event_price: number
    maximum_seat: number
    start_date: string
    end_date: string
    description?: string | null
    img: File | null
    venue_id: string
}
export interface PostEventResponse {
    data: PostEventPayload & {
        id: string
    }
    message: string
}
export const postCreateEventRepo = async (payload: PostEventPayload): Promise<PostEventResponse> => {
    const formData = new FormData()
    formData.append("event_title", payload.event_title)
    formData.append("event_desc", payload.event_desc)
    formData.append("event_category", payload.event_category)
    formData.append("venue_id", payload.venue_id)
    formData.append("event_price", payload.event_price.toString())
    formData.append("maximum_seat", payload.maximum_seat.toString())
    formData.append("start_date", payload.start_date)
    formData.append("end_date", payload.end_date)
    if (payload.description) formData.append("description", payload.description)
    if (payload.img) formData.append("img", payload.img) 

    const res = await apiCall.post(`${MODULE_URL}`, formData)
    const { data, message } = res.data

    return { data, message }
}