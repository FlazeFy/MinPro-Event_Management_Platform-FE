import OrganismNewComerEventOrganizerList from "@/components/organisms/new_comer_event_organizer_list.organism";

export default function EventsPage() {
    return (
        <div className="flex flex-col min-h-[100vh] p-5 lg:p-10">
            <div className="flex flex-wrap mt-5">
                <div className="w-full md:w-4/12 lg:w-3/12">

                </div>
                <div className="w-full md:w-8/12 lg:w-9/12 p-0 md:pr-4">
                    <OrganismNewComerEventOrganizerList/>
                </div>
            </div>
        </div>
    )
}
