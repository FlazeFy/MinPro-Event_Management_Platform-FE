import apiCall from "@/configs/axios"

const MODULE_URL = "/api/v1/referral_code"

export interface RefCodePayload {
    referral_code: string
}
export const createUseRefCodeRepo = async (payload: RefCodePayload): Promise<string> => {
    const res = await apiCall.post(`${MODULE_URL}`, payload)

    return res.data.message
}