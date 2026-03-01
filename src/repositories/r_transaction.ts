import apiCall from "@/configs/axios"
import { EventData, PaginationMeta, UserShortInfo } from "./template"

const MODULE_URL = "/api/v1/transactions"

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
    meta: PaginationMeta
    average_transaction: number
}
export const getAllTransaction = async (page: number, search: string | null, status: string | null): Promise<AllTransactionResponse> => {
    const searchArgs = search ? `&search=${search}` : ''
    const statusArgs = status ? `&status=${status}` : ''
    const res = await apiCall.get(`${MODULE_URL}?page=${page}${searchArgs}${statusArgs}`)
    
    return res.data
}

export interface CreateTransactionPayload {
    payment_method: string
    attendees: {
        fullname: string
        phone_number: string
        birth_date: string
    }[]
    discount_id: string | null
    event_id: string
}
export const createTransactionRepo = async (payload: CreateTransactionPayload): Promise<string> => {
    const res = await apiCall.post(MODULE_URL, payload)

    return res.data.message
}