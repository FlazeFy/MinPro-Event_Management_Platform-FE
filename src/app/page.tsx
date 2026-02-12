import OrganismsBenefitList from "@/components/organisms/benefit_list.organism";
import OrganismsBookingStepList from "@/components/organisms/booking_step_list.organism";
import OrganismsLoginForm from "@/components/organisms/login_form.organism";
import OrganismsWelcomeBox from "@/components/organisms/welcome_box.organism";

export default function Home() {
  return (
    <div className="flex flex-col min-h-[100vh] items-center justify-center py-5 lg:py-10">
      <div className="flex flex-wrap w-full mt-[10vh] p-5 lg:p-10">
        <div className="w-full md:w-1/2">
          <OrganismsWelcomeBox/>
        </div>
        <div className="w-full md:w-1/2">
          <OrganismsLoginForm/>
        </div>
      </div>
      <div className="mt-[20vh] bg-orange-100 w-full p-5 lg:p-10">
        <OrganismsBookingStepList/>
      </div>
      <div className="mt-[20vh] bg-blue-100 w-full p-5 lg:p-10">
        <OrganismsBenefitList/>
      </div>
    </div>
  )
}
