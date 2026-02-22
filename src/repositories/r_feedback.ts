import apiCall from "@/configs/axios"

const MODULE_URL = "/api/v1/feedbacks"

export interface FeedbackPayload {
    feedback_rate: number
    feedback_body: string
}
export const createFeedbackRepo = async (payload: FeedbackPayload): Promise<string> => {
    const res = await apiCall.post(`${MODULE_URL}`, payload)

    return res.data.message
}

interface FeedbackCustomer {
    username: string
}
interface FeedbackEventOrganizer {
    organizer_name: string
}
export interface FeedbackItem {
    feedback_body: string
    feedback_rate: number 
    customer: FeedbackCustomer
    event_organizer: FeedbackEventOrganizer
}
export const getRandomFeedbackRepo = async (): Promise<FeedbackItem[]> => {
    const res = await apiCall.get(`${MODULE_URL}/random`)
    
    return res.data.data
}