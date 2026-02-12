import OrganismsAboutUsBox from "@/components/organisms/about_us_box.organism";
import OrganismsOurOfferList from "@/components/organisms/our_offer_list.organism";

export default function AboutPage() {
    return (
        <div className="flex flex-col min-h-[100vh] items-center justify-center py-5 lg:py-10">
            <OrganismsAboutUsBox/>
            <OrganismsOurOfferList/>
        </div>
    )
}
