import apiCall from "@/configs/axios"
import { UserShortInfo } from "./template"

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

export interface OwnerReferralCodeHistory {
    customer_user: UserShortInfo
}
export interface SocialMedia {
    social_media_platform: string
    social_media_url: string
}
export interface MyProfileResponse extends LoginResponsePayload {
    username: string
    fullname: string
    organizer_name: string
    email: string
    bio: string | null
    phone_number: string
    points: number | null
    profile_image: string | null
    address: string | null
    birth_date: string | null
    created_at: string
    updated_at: string
    referral_code: string | null
    owner_referral_code_histories: OwnerReferralCodeHistory[]
    social_medias: SocialMedia[]
}
export const getMyProfile = async (): Promise<MyProfileResponse> => {
    const res = await apiCall.get(`${MODULE_URL}/profile`)
    
    return res.data.data
}