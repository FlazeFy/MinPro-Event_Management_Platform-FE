import apiCall from "@/configs/axios"
import { TransactionMeta, UserShortInfo, VenueData } from "./template"

const MODULE_URL = "/api/v1/transactions"

interface EventScheduleData {
    venue: VenueData
}
interface EventData {
    id: string
    event_title: string
    event_schedule: EventScheduleData[]
}
export interface TransactionData {
    id: string
    created_at: string
    amount: number
    payment_method: string
    paid_off_at: string
    event: EventData
    customer: UserShortInfo
    is_discount: boolean
    status: string
}
export interface AllTransactionResponse {
    data: TransactionData[]
    meta: TransactionMeta
    average_transaction: number
}
export const getAllTransaction = async (): Promise<AllTransactionResponse> => {
    const res = await apiCall.get(`${MODULE_URL}`)
    
    return res.data
}