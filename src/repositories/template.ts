export interface UserShortInfo {
    id: string
    username: string
    created_at: string
    profile_pic: string
}

export interface EventOrganizerData {
    id: string 
    username?: string
    organizer_name: string
    bio: string
    profile_pic: string
}

export interface DatasetTemplate {
    label: string
    data: number[]
    borderColor?: string
    backgroundColor?: any
}

export interface VenueData {
    id: string
    venue_name: string
    venue_coordinate: string
    venue_address: string
}

export interface EventScheduleData {
    start_date: string
    end_date: string
    venue: VenueData
}
export interface EventData {
    id: string
    event_title: string
    event_category: string
    event_schedule: EventScheduleData[]
}

export interface PaginationMeta {
    page: number
    limit: number
    total: number
    total_page: number
}

export interface StatsData {
    context: string
    total: number
}

export interface FilePayload {
    img: File | null
}