import OrganismsEventOrganizerShortDetail from "@/components/organisms/event_organizer_short_detail.organism";
import OrganismPriceBox from "@/components/organisms/price_box.organism";
import MoleculeAboutEvent from "@/components/molecules/about_event.molecule";
import MoleculeEventSchedule from "@/components/molecules/event_schedule.molecule";
import MoleculeCommunityReviews from "@/components/molecules/community_reviews.molecule";

export default function EventDetailPage() {
    return (
        <div className="min-h-screen p-5">
            <div className="grid w-full grid-cols-1 gap-6 lg:grid-cols-12 lg:items-start">
                <div className="lg:col-span-9">
                    <MoleculeAboutEvent
                        image="https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=2070&auto=format&fit=crop"
                        category="TECHNOLOGY"
                        isHotEvent={true}
                        title="Global AI Summit: The Future of Neural Networks"
                        organizer={{
                            name: "Nexus Events Ltd.",
                            image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=1974&auto=format&fit=crop"
                        }}
                        rating={4.9}
                        reviews={124}
                        description={`<p class="mb-4">Join us for the most anticipated AI event of the year. The Global AI Summit brings together leading minds in machine learning, robotics, and neural computation for a three-day intensive journey into the future of technology.</p>
                        <p>Expect keynote speeches from industry giants, hands-on workshops, and networking sessions that will connect you with the innovators shaping our tomorrow.</p>`}
                    />
                    <MoleculeEventSchedule />
                    <MoleculeCommunityReviews />
                </div>
                <div className="flex w-full flex-col gap-4 lg:col-span-3">
                    <OrganismPriceBox price={299} availableSeats={156} totalSeats={500} />
                    <OrganismsEventOrganizerShortDetail />
                </div>
            </div>
        </div>
    )
}
