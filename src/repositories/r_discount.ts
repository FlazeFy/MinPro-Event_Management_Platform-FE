import apiCall from "@/configs/axios"
const MODULE_URL = "/api/v1/discounts"

export interface CreateDiscountRequestPayload {
    percentage: number
    description: string
}
export const createDiscountRepo = async (payload: CreateDiscountRequestPayload): Promise<string> => {
    const res = await apiCall.post(`${MODULE_URL}/`, payload)

    return res.data.message
}