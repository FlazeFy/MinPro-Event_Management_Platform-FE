'use client'
import OrganismEventCatalog from "@/components/organisms/event_catalog.organism";
import OrganismSearchEventFilter from "@/components/organisms/search_event_filter.organism";
import OrganismTrendingNow from "@/components/organisms/trending_now.organism";
import OrganismNewComerEventOrganizerList from "@/components/organisms/new_comer_event_organizer_list.organism";
import OrganismTrendingEventOrganizer from "@/components/organisms/trending_event_organizer_box.organism";
import { useState } from "react";
import useAuthStore from "@/store/s_auth";

export default function EventPage() {
  // For filtering
  const [maxPrice, setMaxPrice] = useState<number>(0)
  const [search, setSearch] = useState<string>("")
  const [category, setCategory] = useState<string>("")
  const [price, setPrice] = useState<number>(0)
  const { role } = useAuthStore()

  return (
    <div className="flex flex-col min-h-screen p-5 lg:p-10">
      <div className="flex flex-wrap mt-5">
        <div className="w-full lg:w-3/12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-4 lg:sticky lg:top-30">
            <OrganismSearchEventFilter maxPrice={maxPrice} onApply={(filters) => {
              setSearch(filters.search)
              setCategory(filters.category)
              setPrice(filters.price)
            }}/> 
            <OrganismTrendingEventOrganizer/>
          </div>
        </div>
        <div className="w-full lg:w-9/12 p-0 md:ps-4 space-y-4">
          <OrganismTrendingNow/>
          <OrganismEventCatalog setMaxPrice={setMaxPrice} search={search} category={category} price={price} role={role}/>
          <OrganismNewComerEventOrganizerList/>
        </div>
      </div>
    </div>
  )
}
