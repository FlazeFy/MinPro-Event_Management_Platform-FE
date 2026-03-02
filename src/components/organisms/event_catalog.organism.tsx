"use client";
import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import AtomText from "../atoms/text.atom";
import MoleculeEventBox from "../molecules/event_box.molecule";
import { EventItem, getAllEvent } from "@/repositories/r_event";
import Skeleton from "react-loading-skeleton";
import MoleculeNoDataBox from "../molecules/no_data_box.molecule";

interface OrganismEventCatalogProps {
  setMaxPrice: React.Dispatch<React.SetStateAction<number>>
  search: string
  category: string
  price: number
}

const OrganismEventCatalog: React.FC<OrganismEventCatalogProps> = ({ setMaxPrice, search, category, price }) => {
  // For fetching
  const [items, setItems] = useState<EventItem[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  // For state management
  const [page, setPage] = useState(1)
  const [totalPage, setTotalPage] = useState(1)

  const fetchEvents = async (page: number) => {
    setLoading(true)
    try {
      const { data, meta, max_price } = await getAllEvent(page, search, category, price)
      setTotalPage(meta.total_page)
      setItems(prev => page=== 1 ? data : [...prev, ...data])

      if (max_price) setMaxPrice(max_price._max.event_price)
    } catch (err: any) {
      if (err.response?.status === 404 && err.response?.data?.message) {
        setItems([])
        return []
      }
      
      setError(err?.response?.data?.message || "Something went wrong")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchEvents(1)
  }, [])

  useEffect(() => {
    setPage(1)
    fetchEvents(1)
  }, [search, category, price])

  useEffect(() => {
    if (page === 1) return
    fetchEvents(page)
  }, [page])

  return (
    <section className="w-full">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <AtomText type="sub-title" text="Event Catalog" extraClass="text-primary font-bold"/>
      </div>
      <div className="mt-6 overflow-hidden pb-5">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          { loading && <Skeleton style={{ height: "100px" }}/> }
          { (!loading && error) || (!loading && items?.length === 0) && <MoleculeNoDataBox title="No enough data to show" style={{ height: "100px" }} color='gray'/> }
          { items && items.length > 0 && items.map((dt, idx) => <MoleculeEventBox key={idx} event={dt}/>)}
        </div>
      </div>
      {
        page < totalPage && (
          <div className="mt-8 flex justify-center">
            <Button variant="outline" className="h-11 rounded-xl border-gray-300 bg-white px-8 text-base font-semibold text-slate-700 hover:bg-slate-50" onClick={() => setPage(prev => prev + 1)}disabled={loading}>
              {loading ? "Loading..." : "Load More Events"}
            </Button>
          </div>
        )
      }
    </section>
  )
}

export default OrganismEventCatalog
