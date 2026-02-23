'use client'
import OrganismAskJoinBox from "@/components/organisms/ask_join_box.organism";
import OrganismBenefitList from "@/components/organisms/benefit_list.organism";
import OrganismBookingStepList from "@/components/organisms/booking_step_list.organism";
import OrganismLoginForm from "@/components/organisms/login_form.organism";
import OrganismRandomFeedbackList from "@/components/organisms/random_feedback_list.organism";
import OrganismWelcomeBox from "@/components/organisms/welcome_box.organism";
import useAuthStore from "@/store/s_auth";

export default function Home() {
  const { role, name } = useAuthStore()
  const isSignedIn: boolean = role !== null && role !== "" ? true : false

  return (
    <div className="flex flex-col min-h-[100vh] items-center justify-center py-5 lg:py-10" id='login-section'>
      <div className="flex flex-wrap w-full mt-[10vh] p-5 lg:p-10">
        <div className="w-full md:w-1/2">
          <OrganismWelcomeBox isSignedIn={isSignedIn} name={name}/>
        </div>
        <div className="w-full md:w-1/2">
          { isSignedIn ? <></> : <OrganismLoginForm/> }
        </div>
      </div>
      <div className="mt-[20vh] bg-orange-100 w-full p-5 lg:p-10">
        <OrganismBookingStepList/>
      </div>
      <div className="mt-[20vh] bg-blue-100 w-full p-5 lg:p-10">
        <OrganismBenefitList/>
      </div>
      <div className="mt-[20vh] bg-green-100 p-5 lg:p-10 w-full">
        <OrganismRandomFeedbackList/>
      </div>
      <div className="my-[20vh] w-full p-5 lg:p-10">
        <OrganismAskJoinBox isSignedIn={isSignedIn}/>
      </div>
    </div>
  )
}
