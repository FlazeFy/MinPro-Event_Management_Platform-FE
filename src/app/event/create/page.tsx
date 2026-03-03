"use client";
import React, { useState } from 'react'
import OrganismAddEventForm from "@/components/organisms/add_event_form.organism";
import OrganismSelectVenue from '@/components/organisms/select_venue.organism';
import RoleGuard from '@/components/guards/role.guard';

export default function CreateEventPage() {
  const [selectedVenue, setSelectedVenue] = useState<string | null>(null)

  return (
    <RoleGuard allowedRoles={["event_organizer"]}>
      <div className="flex justify-center px-10 py-5 lg:py-10 max-w-[1080px] mx-auto">
        <div className="border border-gray-200 p-5 lg:p-10 rounded-xl grid grid-cols-1 grid-cols-2 gap-4">
          <OrganismAddEventForm selectedVenue={selectedVenue}/>
          <OrganismSelectVenue selectedVenue={selectedVenue} setSelectedVenue={setSelectedVenue} />
        </div>
      </div>
    </RoleGuard>
  )
}
