import OrganismsLoginForm from "@/components/organisms/login_form.organism";
import OrganismsWelcomeBox from "@/components/organisms/welcome_box.organism";

export default function Home() {
  return (
    <div className="flex flex-col min-h-[100vh] items-center justify-center p-5 lg:p-10">
      <div className="flex flex-wrap w-full">
        <div className="w-full md:w-1/2">
          <OrganismsWelcomeBox/>
        </div>
        <div className="w-full md:w-1/2">
          <OrganismsLoginForm/>
        </div>
      </div>
    </div>
  )
}
