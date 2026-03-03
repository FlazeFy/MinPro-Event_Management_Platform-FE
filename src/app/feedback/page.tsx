import RoleGuard from "@/components/guards/role.guard";
import OrganismFeedbackBox from "@/components/organisms/feedback_form.organism";

export default function FeedbackPage() {
    return (
        <RoleGuard allowedRoles={["event_organizer","customer"]}>
            <div className="flex flex-col min-h-[100vh] items-center justify-center py-5 lg:py-10">
                <OrganismFeedbackBox/>
            </div>
        </RoleGuard>
    )
}
