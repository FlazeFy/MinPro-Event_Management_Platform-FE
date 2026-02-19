import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as Yup from "yup"
import Swal from "sweetalert2"
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { MyProfileResponse, putUpdateProfileRepo } from "@/repositories/r_auth"

interface Props {
    user: MyProfileResponse
    fetchMyProfile: () => void
    onLoginStore: (data: { email: string; name: string }) => void
    setOpen: (val: boolean) => void
}

const schema = Yup.object({
    email: Yup.string().required().min(10).test(
        "is-gmail", "Email must end with @gmail.com", 
        (val?: string) => !!val && val.endsWith("@gmail.com")
    ),
    username: Yup.string().required().min(6).max(36),
    phone_number: Yup.string().required().max(16),
    fullname: Yup.string().required().max(75),
    birth_date: Yup.date().required("Birth date is required").typeError("Birth date is required").max(new Date(), "Birth date cannot be in the future"),
})

type FormValues = Yup.InferType<typeof schema>

const OrganismCustomerProfileForm: React.FC<Props> = ({ user, fetchMyProfile, onLoginStore, setOpen }) => {
    const form = useForm<FormValues>({
        resolver: yupResolver(schema),
        defaultValues: {
            email: user.email,
            username: user.username,
            phone_number: user.phone_number,
            fullname: user.fullname,
            birth_date: new Date(user.birth_date),
        },
    })

    const onSubmit = async (values: FormValues) => {
        try {
            const res = await putUpdateProfileRepo(values)

            setOpen(false)
            Swal.fire({
                icon: "success",
                title: "Done",
                text: res,
            }).then(() => {
                onLoginStore({ email: values.email, name: values.username })
                fetchMyProfile()
            })
        } catch (err: any) {
            Swal.fire("I'm sorry", err.response?.data?.message ?? "Something went wrong", "error")
        }
    }

    return (
        <div className="flex flex-col gap-3 max-h-[75vh] overflow-y-auto pr-2">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">

                    <FormField control={form.control} name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl><Input {...field}/></FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}/>
                    <FormField control={form.control} name="username"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Username</FormLabel>
                                <FormControl><Input {...field}/></FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}/>
                    <FormField control={form.control} name="fullname"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Fullname</FormLabel>
                                <FormControl><Input {...field}/></FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}/>
                    <FormField control={form.control} name="birth_date"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Birth Date</FormLabel>
                                <FormControl>
                                    <Input type="date" value={field.value ? new Date(field.value).toISOString().split("T")[0] : ""}
                                        onChange={(e) =>
                                            field.onChange(e.target.value ? new Date(e.target.value) : null)
                                        }
                                    />
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}/>
                    <FormField control={form.control} name="phone_number"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Phone Number</FormLabel>
                                <FormControl><Input {...field}/></FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}/>
                    <Button type="submit" disabled={form.formState.isSubmitting}>
                        { form.formState.isSubmitting ? "Let me check first..." : "Save Changes" }
                    </Button>
                </form>
            </Form>
        </div>
    )
}

export default OrganismCustomerProfileForm
