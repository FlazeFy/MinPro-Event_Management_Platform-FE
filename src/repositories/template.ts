export interface UserShortInfo {
    id: string
    username: string
    created_at: string
    profile_pic: string
}

export interface DatasetTemplate {
    label: string
    data: number[]
    borderColor?: string
    backgroundColor?: any
}

export interface VenueData {
    venue_name: string
    venue_coordinate: string
}

interface EventScheduleData {
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