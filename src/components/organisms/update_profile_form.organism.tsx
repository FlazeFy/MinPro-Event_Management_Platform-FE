import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons"
import { MyProfileResponse } from "@/repositories/r_auth"
import useAuthStore from "@/store/s_auth"
import OrganismCustomerProfileForm from "./update_profile_customer_form.organism"
import OrganismEventOrganizerProfileForm from "./update_profile_event_organizer_form.organism"

interface IOrganismUpdateProfileFormProps {
    user: MyProfileResponse
    fetchMyProfile: () => void
}

const OrganismUpdateProfileForm: React.FC<IOrganismUpdateProfileFormProps> = ({ user, fetchMyProfile }) => {
    const [open, setOpen] = useState(false)
    const { onLoginStore } = useAuthStore()

    const isOrganizer = user.role === "event_organizer"

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button><FontAwesomeIcon icon={faPenToSquare}/> Edit Profile</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Edit Profile</DialogTitle>
                </DialogHeader>
                {
                    isOrganizer ? 
                        <OrganismEventOrganizerProfileForm user={user} fetchMyProfile={fetchMyProfile} onLoginStore={onLoginStore} setOpen={setOpen}/>
                    : 
                        <OrganismCustomerProfileForm user={user} fetchMyProfile={fetchMyProfile} onLoginStore={onLoginStore} setOpen={setOpen}/>
                
                }
            </DialogContent>
        </Dialog>
    )
}

export default OrganismUpdateProfileForm
