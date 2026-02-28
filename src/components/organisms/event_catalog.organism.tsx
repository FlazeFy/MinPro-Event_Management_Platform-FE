"use client";
import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import AtomText from "../atoms/text.atom";
import MoleculeEventBox from "../molecules/event_box.molecule";
import { EventItem, getAllEvent } from "@/repositories/r_event";
import Skeleton from "react-loading-skeleton";
import MoleculeNoDataBox from "../molecules/no_data_box.molecule";

interface OrganismEventCatalogProps {}

const OrganismEventCatalog: React.FC<OrganismEventCatalogProps> = ({}) => {
  // For fetching
  const [items, setItems] = useState<EventItem[]>()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  // For state management
  const [page, setPage] = useState(1)
  const [search, setSearch] = useState<string>("")

  const fetchMyDiscount = async () => {
      setLoading(true)
      try {
        const { data, meta } = await getAllEvent(page, search)
        setItems(data)
        setPage(meta.page)
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
      fetchMyDiscount()
  }, [])

  return (
    <section className="w-full">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <AtomText type="sub-title" text="Event Catalog"extraClass="text-primary font-bold"/>
      </div>

      <div className="mt-6 overflow-hidden">
        <div className="-ml-2 flex">
          { loading && <Skeleton style={{ height: "100px" }}/> }
          { (!loading && error) || (!loading && items?.length === 0) && <MoleculeNoDataBox title="No enough data to show" style={{ height: "100px" }}/> }
          { items && items.length > 0 && items.map((dt, idx) => <MoleculeEventBox event={dt}/>)}
        </div>
      </div>
      <div className="mt-8 flex justify-center">
        <Button variant="outline" className="h-11 rounded-xl border-gray-300 bg-white px-8 text-base font-semibold text-slate-700 hover:bg-slate-50">Load More Events</Button>
      </div>
    </section>
  );
};

export default OrganismEventCatalog;
