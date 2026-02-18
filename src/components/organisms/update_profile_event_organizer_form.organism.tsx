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
    organizer_name: Yup.string().required().max(125),
    address: Yup.string().nullable().required().max(255),
    bio: Yup.string().nullable().required().max(500),
})

type FormValues = Yup.InferType<typeof schema>

const OrganismEventOrganizerProfileForm: React.FC<Props> = ({ user, fetchMyProfile, onLoginStore, setOpen }) => {
    const form = useForm<FormValues>({
        resolver: yupResolver(schema),
        defaultValues: {
            email: user.email,
            username: user.username,
            phone_number: user.phone_number,
            organizer_name: user.organizer_name,
            address: user.address ?? "",
            bio: user.bio ?? "",
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
            Swal.fire("error", "I'm sorry", err.response?.data?.message ?? "Something went wrong")
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
                    <FormField control={form.control} name="organizer_name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Organizer Name</FormLabel>
                                <FormControl><Input {...field}/></FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}/>
                    <FormField control={form.control} name="address"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Address</FormLabel>
                                <FormControl>
                                    <textarea className="w-full border rounded p-2" {...field} value={field.value ?? ""}/>
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}/>
                    <FormField control={form.control} name="bio"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Bio</FormLabel>
                                <FormControl>
                                    <textarea className="w-full border rounded p-2" {...field} value={field.value ?? ""}/>
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

export default OrganismEventOrganizerProfileForm
