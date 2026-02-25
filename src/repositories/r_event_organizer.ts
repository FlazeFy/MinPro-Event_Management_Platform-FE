import apiCall from "@/configs/axios"

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
export const getNewComerEventOrganizerRepo = async (page: number, search: string | null): Promise<NewComerEventOrganizerItem[]> => {
    const res = await apiCall.get(`${MODULE_URL}/new_comer?page=${page}}`)
    
    return res.data.data
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