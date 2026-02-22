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

interface RegisterCustomerPayload {
    username: string
    fullname: string
    email: string
    phone_number: string
    birth_date: string
    password: string
    password_confirmation: string
}
export interface RegisterResponse {
    data: LoginResponsePayload
    message: string
}
export const registerCustomerRepo = async (payload: RegisterCustomerPayload): Promise<RegisterResponse> => {
    const formData = new FormData()
    formData.append("username", payload.username)
    formData.append("fullname", payload.fullname)
    formData.append("email", payload.email)
    formData.append("phone_number", payload.phone_number)
    formData.append("birth_date", payload.birth_date)
    formData.append("password", payload.password)
    formData.append("password_confirmation", payload.password_confirmation)

    const res = await apiCall.post(`${MODULE_URL}/register/customer`, formData)

    return res.data
}

export interface RegisterEventOrganizerPayload {
    username: string
    organizer_name: string
    email: string
    phone_number: string
    bio: string
    address: string
    password: string
    password_confirmation: string
}
export const registerEventOrganizerRepo = async (payload: RegisterEventOrganizerPayload): Promise<RegisterResponse> => {
    const formData = new FormData()
    formData.append("username", payload.username)
    formData.append("organizer_name", payload.organizer_name)
    formData.append("email", payload.email)
    formData.append("phone_number", payload.phone_number)
    formData.append("bio", payload.bio)
    formData.append("address", payload.address)
    formData.append("password", payload.password)
    formData.append("password_confirmation", payload.password_confirmation)

    const res = await apiCall.post(`${MODULE_URL}/register/event_organizer`, formData)

    return res.data
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
    bio: string
    phone_number: string
    points: number
    profile_image: string
    address: string 
    birth_date: string
    created_at: string
    updated_at: string
    referral_code: string
    owner_referral_code_histories: OwnerReferralCodeHistory[]
    social_medias: SocialMedia[]
}
export const getMyProfile = async (): Promise<MyProfileResponse> => {
    const res = await apiCall.get(`${MODULE_URL}/profile`)
    
    return res.data.data
}

export interface UpdateProfilePayload {
    email: string
    username: string,
    organizer_name: string | null | undefined,
    address: string | null | undefined,
    bio: string | null | undefined,
    phone_number: string
    fullname: string | null | undefined
    birth_date: string | null | undefined
}
export const putUpdateProfileRepo = async (payload: any): Promise<string> => {
    const res = await apiCall.put(`${MODULE_URL}/profile`, payload)

    return res.data.message
}