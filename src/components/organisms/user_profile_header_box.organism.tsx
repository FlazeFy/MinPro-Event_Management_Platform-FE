'use client'
import * as React from 'react'
import AtomText from '../atoms/text.atom'
import { faSignOut } from '@fortawesome/free-solid-svg-icons'
import { Button } from '../ui/button'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Badge } from '../ui/badge'
import { convertAgeFromBornDate, convertUTCToLocal } from '@/helpers/converter.helper'
import useAuthStore from '@/store/s_auth'
import { useRouter } from 'next/navigation'
import Swal from 'sweetalert2'
import { MyProfileResponse, PostUpdateProfileImagePayload, postUpdateProfileImageRepo } from '@/repositories/r_auth'
import OrganismUpdateProfileForm from './update_profile_form.organism'
import OrganismEditImagePickerPicker from './edit_image_picker.organism'

interface IOrganismUserProfileHeaderBoxProps {
    user: MyProfileResponse
    fetchMyProfile: () => void
}

const OrganismUserProfileHeaderBox: React.FunctionComponent<IOrganismUserProfileHeaderBoxProps> = ({ user, fetchMyProfile }) => {
    // For global state
    const onLogOutStore = useAuthStore((state) => state.onLogOutStore)
    // For state management
    const router = useRouter()

    const handleLogout = async () => {
        const confirmResult = await Swal.fire({
            title: 'Sign out?',
            text: 'You will be logged out from your account',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, sign out',
            cancelButtonText: 'Cancel',
            allowOutsideClick: false,
            allowEscapeKey: false,
        })
    
        if (!confirmResult.isConfirmed) return
    
        const successResult = await Swal.fire({
            title: 'Signed out',
            text: 'You have been logged out successfully',
            icon: 'success',
            confirmButtonText: 'Continue',
            allowOutsideClick: false,
            allowEscapeKey: false,
        })
    
        if (!successResult.isConfirmed) return
    
        // Clear global state
        onLogOutStore()

        // Clear client local / session
        localStorage.clear()
        sessionStorage.clear()

        router.push('/')
    }

    const handleUpdateProfileImage = async (values: PostUpdateProfileImagePayload) => {
        try {
            Swal.fire({
                title: "Changing your profile image...",
                text: "Please wait a moment",
                allowOutsideClick: false,
                didOpen: () => Swal.showLoading()
            })

            const payload = { img: values.img ?? null }
            const message = await postUpdateProfileImageRepo(payload)
            fetchMyProfile()
            await Swal.fire("success", message, "success")
        } catch (err: any) {
            Swal.fire("I'm sorry", err.response?.data?.message ?? "Something went wrong", "error")
        }
    }

    return (
        <div className="w-full relative rounded-2xl bg-gradient-to-r from-blue-300 via-gray-300 to-orange-300 p-8 shadow-sm">
            <div className="flex items-center justify-between">                    
                <div className="flex items-center gap-6">
                    <div className="relative">
                        <OrganismEditImagePickerPicker maxSize={10} profilePic={user.profile_pic}
                            onFileSelect={(file) => {
                                const payload: PostUpdateProfileImagePayload = { img: file }
                                handleUpdateProfileImage(payload)
                            }}
                        />
                    </div>
                    <div>
                        <AtomText type='sub-title-small' text={user.username}/>
                        { user.role === "customer" && user.birth_date && <AtomText type='sub-content' text={`${convertUTCToLocal(user.birth_date, false, false)} | ${convertAgeFromBornDate(user.birth_date)} y.o`}/> }
                        { user.role === "event_organizer" && user.bio && <AtomText type='sub-content' text={user.bio}/> }
                        <div className="flex gap-3 mt-3">
                            <Badge className="px-3 py-1 bg-blue-100 text-blue-600 capitalize">{user.role.replace("_"," ")}</Badge>
                            <Badge className="px-3 py-1 bg-orange-100 text-orange-500 font-medium capitalize">Supporter</Badge>
                        </div>
                    </div>
                </div>
                <div className='flex gap-2'>
                    <OrganismUpdateProfileForm user={user} fetchMyProfile={fetchMyProfile}/>
                    <Button variant="destructive" onClick={handleLogout}><FontAwesomeIcon icon={faSignOut}/></Button>
                </div>
            </div>
        </div>
    )
}

export default OrganismUserProfileHeaderBox;
