import apiCall from "@/configs/axios"
import { EventData, EventScheduleData, FilePayload, PaginationMeta, UserShortInfo } from "./template"

const MODULE_URL = "/api/v1/transactions"

export interface TransactionData {
    id: string
    transaction_code: string
    created_at: string
    final_amount: number
    discount_cut: number 
    point_cut: number 
    real_amount: number
    payment_method: string
    paid_off_at: string
    event: EventData
    customer: UserShortInfo
    is_discount: boolean
    status: string
    transaction_pic: string | null
    ticket_token: string | null
    event_schedule: EventScheduleData[]
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
    discounts: {
        id: string
        type: "discount" | "points"
    }[]
    event_id: string
}
export const createTransactionRepo = async (payload: CreateTransactionPayload): Promise<string> => {
    const res = await apiCall.post(MODULE_URL, payload)

    return res.data.message
}

export const postUpdateTransactionRepo = async (payload: FilePayload, id: string): Promise<string> => {
    const formData = new FormData()
    if (payload.img) formData.append("img", payload.img) 
    formData.append("transaction_id", id)

    const res = await apiCall.post(`${MODULE_URL}/payment-evidence`, formData)

    return res.data.message
}