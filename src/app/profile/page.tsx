'use client'
import OrganismsPointRefCodeBox from "@/components/organisms/point_ref_code_box.organism";
import OrganismsRecentTransactionList from "@/components/organisms/recent_transaction_list.organism";
import OrganismsRefCodeList from "@/components/organisms/ref_code_list.organism";
import OrganismsUserProfileContactBox from "@/components/organisms/user_profile_contact_box.organism";
import OrganismsUserProfileHeaderBox from "@/components/organisms/user_profile_header_box.organism";
import { getMyProfile, MyProfileResponse } from "@/repositories/r_auth";
import useAuthStore from "@/store/s_auth";
import React, { useEffect, useState } from 'react'
import Skeleton from "react-loading-skeleton"

export default function ProfilePage() {
    const [profileItem, setProfileItem] = useState<MyProfileResponse | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const { role } = useAuthStore()

    useEffect(() => {
        const fetchMyProfile = async () => {
            try {
                const data = await getMyProfile()
                setProfileItem(data)
            } catch (err: any) {
                setError(err?.response?.data?.message || "Something went wrong")
            } finally { 
                setLoading(false)
            }
        }

        fetchMyProfile()
    }, [])

    return (
        <div className="flex flex-col min-h-[100vh] p-5 lg:p-10">
            {
                loading && <Skeleton className="h-[200px] w-full rounded-xl" />
            }
            {
                !loading && profileItem && (
                    <>
                        <OrganismsUserProfileHeaderBox username={profileItem.username} role={role} birth_date={profileItem.birth_date}/>
                        <div className="flex flex-wrap mt-5">
                            <div className="w-full md:w-8/12 lg:w-9/12 p-0 md:pr-4">
                                <OrganismsRecentTransactionList role={role}/>
                            </div>
                            <div className="w-full md:w-4/12 lg:w-3/12">
                                <OrganismsUserProfileContactBox fullname={profileItem.fullname} email={profileItem.email} phone_number={profileItem.phone_number} address={profileItem.address} role={role}/>
                                <br/>
                                {
                                    role === "customer" && profileItem.points && profileItem.referral_code && (
                                        <>
                                            <OrganismsPointRefCodeBox points={profileItem.points} referral_code={profileItem.referral_code}/>
                                            <br/>
                                            <OrganismsRefCodeList customers={profileItem.owner_referral_code_histories}/>
                                        </>
                                    )
                                }
                            </div>
                        </div>
                    </>
                )
            }
        </div>
    )
}
