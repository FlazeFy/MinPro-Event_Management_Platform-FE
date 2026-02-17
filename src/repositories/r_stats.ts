import apiCall from "@/configs/axios"

const MODULE_URL = "/api/v1/stats"

export interface EventOrganizerSummaryResponse {
    upcoming_event: string | null
    total_transaction: number
    total_attendee: number
    total_revenue: number
    total_actual_revenue: number
    average_review_rate: number
}
export const getEventOrganizerSummary = async (): Promise<EventOrganizerSummaryResponse> => {
    const res = await apiCall.get(`${MODULE_URL}/summary/event_organizer`)
    
    return res.data.data
}

interface LineChartDataset {
    label: string 
    data: number[]
}
export interface LineChartResponse {
    labels: string[]
    datasets: LineChartDataset[]
}
export const getPeriodicRevenue = async (): Promise<LineChartResponse> => {
    const res = await apiCall.get(`${MODULE_URL}/periodic/revenue`)
    
    return res.data.data
}