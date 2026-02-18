import apiCall from "@/configs/axios"
import { EventData, PaginationMeta } from "./template"

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
export const getPeriodicAttendee = async (): Promise<LineChartResponse> => {
    const res = await apiCall.get(`${MODULE_URL}/periodic/attendee`)
    
    return res.data.data
}

export interface CustomerTransactionByEventOrganizer {
    amount: number
    created_at: string
    event: EventData
}
export interface CustomerTransactionByEventOrganizerItemWithMeta {
    data: CustomerTransactionByEventOrganizer[]
    meta: PaginationMeta
}
export const getCustomerTransactionByEventOrganizer = async (customerId: string): Promise<CustomerTransactionByEventOrganizerItemWithMeta> => {
    const res = await apiCall.get(`${MODULE_URL}/transaction/${customerId}`)
    const { data, meta } = res.data

    return { data, meta }
}