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

export interface TransactionMeta {
    page: number
    limit: number
    total: number
    total_page: number
}