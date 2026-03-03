import RoleGuard from "@/components/guards/role.guard";
import OrganismNewComerEventOrganizerDetailList from "@/components/organisms/new_comer_event_organizer_detail_list.organism";
import React from 'react'

export default function EventOrganizerPage() {
    return (
        <RoleGuard allowedRoles={["event_organizer","customer"]}>
            <div className="flex flex-col min-h-[100vh] p-5 lg:p-10">
                <OrganismNewComerEventOrganizerDetailList/>
            </div>
        </RoleGuard>
    )
}
