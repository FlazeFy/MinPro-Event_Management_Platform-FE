import OrganismsPointRefCodeBox from "@/components/organisms/point_ref_code_box.organism";
import OrganismsRecentTransactionList from "@/components/organisms/recent_transaction_list.organism";
import OrganismsRefCodeList from "@/components/organisms/ref_code_list.organism";
import OrganismsUserProfileContactBox from "@/components/organisms/user_profile_contact_box.organism";
import OrganismsUserProfileHeaderBox from "@/components/organisms/user_profile_header_box.organism";

export default function ProfilePage() {
    return (
        <div className="flex flex-col min-h-[100vh] p-5 lg:p-10">
            <OrganismsUserProfileHeaderBox/>
            <div className="flex flex-wrap mt-5">
                <div className="w-full md:w-8/12 lg:w-9/12 p-0 md:pr-4">
                    <OrganismsRecentTransactionList/>
                </div>
                <div className="w-full md:w-4/12 lg:w-3/12">
                    <OrganismsUserProfileContactBox/>
                    <br/>
                    <OrganismsPointRefCodeBox/>
                    <br/>
                    <OrganismsRefCodeList/>
                </div>
            </div>
        </div>
    )
}
