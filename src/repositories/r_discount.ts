import apiCall from "@/configs/axios"
import { PaginationMeta } from "./template"
const MODULE_URL = "/api/v1/discounts"

export interface CreateDiscountRequestPayload {
    percentage: number
    description: string
}
export const createDiscountRepo = async (payload: CreateDiscountRequestPayload): Promise<string> => {
    const res = await apiCall.post(`${MODULE_URL}/`, payload)

    return res.data.message
}

export interface DiscountItem {
    id: string
    description: string
    percentage: number
    created_at: string
    expired_at: string | null
}
export interface DiscountItemWithMeta {
    data: DiscountItem[]
    meta: PaginationMeta
}
export const getMyDiscount = async (page: number): Promise<DiscountItemWithMeta> => {
    const res = await apiCall.get(`${MODULE_URL}?page=${page}`)
    const { data, meta } = res.data

    return { data, meta }
}