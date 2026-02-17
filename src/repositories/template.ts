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