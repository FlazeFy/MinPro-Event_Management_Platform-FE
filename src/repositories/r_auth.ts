import apiCall from "@/configs/axios"

const MODULE_URL = "/api/v1/auths"

export interface LoginPayload {
    email: string
    password: string
}
export interface LoginResponsePayload {
    name: string
    email: string
    role: string
    token: string
}
export const loginRepo = async (payload: LoginPayload): Promise<LoginResponsePayload> => {
    const res = await apiCall.post(`${MODULE_URL}/login`, payload)

    return res.data.data
}

export const refreshAuthToken = async (): Promise<LoginResponsePayload> => {
    const res = await apiCall.get(`${MODULE_URL}/refresh`)

    return res.data.data
}