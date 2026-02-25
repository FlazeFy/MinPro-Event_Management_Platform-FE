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