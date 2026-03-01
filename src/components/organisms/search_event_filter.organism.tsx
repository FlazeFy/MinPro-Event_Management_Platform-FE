"use client";
import React, { useMemo, useState, useEffect } from "react";
import { Search } from "lucide-react";
import AtomText from "../atoms/text.atom";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

interface FilterCategory {
  id: string
  label: string
}

interface OrganismSearchEventFilterProps {
  categories?: FilterCategory[]
  minPrice?: number
  maxPrice?: number
  onApply: (filters: {
    search: string
    category: string
    price: number
  }) => void
}

const defaultCategories: FilterCategory[] = [
  { id: "all", label: "All" },
  { id: "live_music", label: "Live Music" },
  { id: "concert", label: "Concert" },
  { id: "theater", label: "Theater" },
]

const OrganismSearchEventFilter: React.FC<OrganismSearchEventFilterProps> = ({ categories = defaultCategories, minPrice = 0, maxPrice = 1000, onApply }) => {
  const [search, setSearch] = useState("")
  const [selectedCategory, setSelectedCategory] = useState(categories[0]?.id ?? "")
  const [price, setPrice] = useState(maxPrice)

  const sliderPercent = useMemo(() => 
    maxPrice <= minPrice ? 0 : ((price - minPrice) / (maxPrice - minPrice)) * 100,
    [maxPrice, minPrice, price]
  )

  useEffect(() => {
    setPrice(maxPrice)
  }, [maxPrice])

  return (
    <aside className="w-full rounded-2xl border border-slate-200 bg-white p-5 shadow-sm lg:top-6">
      <div className="space-y-7">
        <div>
          <AtomText type="label" text="SEARCH" extraClass="mb-2 block text-xs font-bold tracking-wide text-slate-400" />
          <div className="relative">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <Input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Find an event..." className="h-11 rounded-xl border-slate-200 bg-white pl-10 text-sm" />
          </div>
        </div>
        <div>
          <AtomText type="label" text="CATEGORIES" extraClass="mb-3 block text-xs font-bold tracking-wide text-slate-400" />
          <div className="space-y-3">
            {categories.map((category) => (
              <label key={category.id} className="flex cursor-pointer items-center gap-2.5 text-base font-medium text-slate-600">
                <input type="radio" name="event-category" value={category.id} checked={selectedCategory === category.id} onChange={() => setSelectedCategory(category.id)} className="h-4 w-4 accent-indigo-500" />
                <span>{category.label}</span>
              </label>
            ))}
          </div>
        </div>
        <div>
          <AtomText type="label" text="PRICE RANGE" extraClass="mb-3 block text-xs font-bold tracking-wide text-slate-400" />
          <div className="space-y-2">
            <input type="range" min={minPrice} max={maxPrice} value={price} onChange={(e) => setPrice(Number(e.target.value))} className="h-2 w-full cursor-pointer appearance-none rounded-full bg-slate-200" 
              style={{ background: `linear-gradient(to right, #6366f1 ${sliderPercent}%, #e2e8f0 ${sliderPercent}%)` }} />
            <div className="flex items-center justify-between text-sm text-slate-400">
              <span>Free Event</span>
              <span>Rp. {maxPrice.toLocaleString()}</span>
            </div>
          </div>
        </div>
        <div className="border-t border-slate-200 pt-5">
          <Button className="h-11 w-full rounded-xl bg-indigo-500 text-base font-semibold text-white hover:bg-indigo-600"
            onClick={() => onApply({ search, category: selectedCategory, price })}>Apply Filters</Button>
        </div>
      </div>
    </aside>
  );
};

export default OrganismSearchEventFilter;
