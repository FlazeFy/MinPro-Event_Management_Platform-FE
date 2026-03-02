import apiCall from "@/configs/axios"
import { PaginationMeta } from "./template"
const MODULE_URL = "/api/v1/venues"

export interface VenueItem {
    id: string
    venue_name: string
    venue_description: string
    venue_coordinate: string
    venue_address: string
}
export interface VenueItemWithMeta {
    data: VenueItem[]
    meta: PaginationMeta
}
export const getAllVenueRepo = async (page: number, search: string | null): Promise<VenueItemWithMeta> => {
    const searchArgs = search ? `&search=${search}` : ''
    const res = await apiCall.get(`${MODULE_URL}?page=${page}${searchArgs}`)
    const { data, meta } = res.data

    return { data, meta }
}