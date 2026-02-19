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