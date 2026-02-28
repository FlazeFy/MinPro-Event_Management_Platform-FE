"use client";

import { useState } from "react";
import { CalendarDays, Clock3, Info, MapPin, Rocket, Ticket, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function CreateEventPage() {
  const [isPaidEvent, setIsPaidEvent] = useState(true);

  const inputClass = "h-12 rounded-2xl border-[#efe6d9] bg-[#f9f6f2] text-base";
  const labelClass = "text-lg font-semibold text-slate-700";
  const requiredMark = <span className="text-[#f97316]">*</span>;

  return (
    <main className="min-h-screen bg-[#f7f7f8] p-4 md:p-8">
      <div className="mx-auto w-full max-w-6xl rounded-3xl border border-[#ece8e1] bg-white p-5 shadow-[0_10px_30px_rgba(30,41,59,0.06)] md:p-8">
        <form className="space-y-8">
          <section className="space-y-5">
            <div className="flex items-center gap-2">
              <Info className="h-5 w-5 text-[#f59e0b]" />
              <h2 className="text-3xl font-bold text-slate-900">General Information</h2>
            </div>
            <div className="space-y-2">
              <label className={labelClass}>Event Title {requiredMark}</label>
              <Input required maxLength={144} placeholder="Enter a catchy title (e.g., Summer Tech Summit 2024)" className={inputClass} />
              <p className="text-right text-sm text-[#d4a373]">Max 144 characters</p>
            </div>
            <div className="space-y-2">
              <label className={labelClass}>Event Description {requiredMark}</label>
              <Textarea required maxLength={500} placeholder="Tell your audience what the event is about..." className="min-h-36 rounded-2xl border-[#efe6d9] bg-[#f9f6f2] text-base" />
              <p className="text-right text-sm text-[#d4a373]">Max 500 characters</p>
            </div>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <label className={labelClass}>Event Category {requiredMark}</label>
                <Select>
                  <SelectTrigger className={`${inputClass} w-full`}>
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="music">Music & Festivals</SelectItem>
                    <SelectItem value="tech">Tech Conferences</SelectItem>
                    <SelectItem value="workshop">Workshops</SelectItem>
                    <SelectItem value="art">Art Exhibitions</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <label className={labelClass}>Maximum Seats {requiredMark}</label>
                <div className="relative">
                  <Users className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[#d4a373]" />
                  <Input required type="number" min={1} placeholder="e.g. 100" className={`${inputClass} pl-12`} />
                </div>
              </div>
            </div>
          </section>
          <section className="space-y-5 border-t border-[#f0ece5] pt-8">
            <div className="flex items-center gap-2">
              <Clock3 className="h-5 w-5 text-[#f59e0b]" />
              <h2 className="text-3xl font-bold text-slate-900">Schedule & Location</h2>
            </div>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <label className={labelClass}>Start Date & Time {requiredMark}</label>
                <div className="relative">
                  <Input required type="datetime-local" className={`${inputClass} pr-12`} />
                  <CalendarDays className="pointer-events-none absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-500" />
                </div>
              </div>
              <div className="space-y-2">
                <label className={labelClass}>End Date & Time {requiredMark}</label>
                <div className="relative">
                  <Input required type="datetime-local" className={`${inputClass} pr-12`} />
                  <CalendarDays className="pointer-events-none absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-500" />
                </div>
              </div>
            </div>
            <div className="space-y-2">
              <label className={labelClass}>Venue Location {requiredMark}</label>
              <div className="relative">
                <MapPin className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[#d4a373]" />
                <Input required placeholder="Enter full address or venue name" className={`${inputClass} pl-12`} />
              </div>
            </div>
          </section>
          <section className="space-y-5 border-t border-[#f0ece5] pt-8">
            <div className="flex items-center justify-between rounded-2xl border border-[#efe6d9] bg-[#f9f6f2] p-4">
              <div className="flex items-start gap-3">
                <Ticket className="mt-1 h-5 w-5 text-[#f59e0b]" />
                <div>
                  <p className="text-lg font-semibold text-slate-900">Is this a paid event?</p>
                  <p className="text-sm text-[#d4a373]">Toggle to set ticket pricing</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsPaidEvent((prev) => !prev)}
                className={`relative inline-flex h-8 w-14 items-center rounded-full border p-0.5 transition-all duration-200 ${isPaidEvent
                    ? "border-[#6b210f] bg-[#f97316]"
                    : "border-[#f59e0b] bg-[#fdba74]"
                  }`}
                aria-label="Toggle paid event"
              >
                <span
                  className={`h-7 w-7 rounded-full bg-white shadow-[0_4px_10px_rgba(0,0,0,0.28)] ring-1 ring-black/10 transform transition-transform duration-200 ${
                    isPaidEvent ? "translate-x-6" : "translate-x-0"
                  }`}
                />
              </button>
            </div>
            <div className="space-y-2">
              <label className={labelClass}>Event Price ($) {isPaidEvent && requiredMark}</label>
              <div className="relative">
                <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-2xl text-[#d4a373]">$</span>
                <Input required={isPaidEvent} disabled={!isPaidEvent} type="number" min={0} step="0.01" placeholder="0.00" className={`${inputClass} pl-10 disabled:opacity-60`} />
              </div>
            </div>
          </section>
          <div className="pt-2">
            <Button type="submit" className="h-14 w-full rounded-2xl bg-[#f97316] text-xl font-semibold text-white shadow-[0_10px_20px_rgba(249,115,22,0.35)] hover:bg-[#ea6b13]">
              <Rocket className="h-5 w-5" />
              Publish Event
            </Button>
          </div>
        </form>
      </div>
    </main>
  );
}
