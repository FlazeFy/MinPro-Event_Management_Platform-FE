"use client";
import React, { useState } from 'react'
import OrganismAddEventForm from "@/components/organisms/add_event_form.organism";
import OrganismSelectVenue from '@/components/organisms/select_venue.organism';
import RoleGuard from '@/components/guards/role.guard';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

export default function CreateEventPage() {
  const [selectedVenue, setSelectedVenue] = useState<string | null>(null)

  return (
    <RoleGuard allowedRoles={["event_organizer"]}>
      <div className="py-5 lg:py-10 px-4 max-w-[1080px] mx-auto">
        <Link href="/profile">
            <Button className='mb-4 bg-danger'><FontAwesomeIcon icon={faArrowLeft}/>Back</Button>
        </Link>
        <div className="md:border md:border-gray-200 py-5 md:px-7 lg:p-10 md:rounded-xl grid grid-cols-1 md:grid-cols-2 gap-4">
          <OrganismSelectVenue selectedVenue={selectedVenue} setSelectedVenue={setSelectedVenue}/>
          <OrganismAddEventForm selectedVenue={selectedVenue}/>
        </div>
      </div>
    </RoleGuard>
  )
}
