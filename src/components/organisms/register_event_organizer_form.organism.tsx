"use client"
import * as React from 'react'
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as Yup from "yup"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form"
import { Textarea } from "@/components/ui/textarea"
import { useRouter } from "next/navigation"
import useAuthStore from '@/store/s_auth'
import Swal from "sweetalert2"
import { registerEventOrganizerRepo } from '@/repositories/r_auth'

// Validation
const registerSchema = Yup.object({
    username: Yup.string().required("Username is required").min(6).max(36),
    organizer_name: Yup.string().required("Organizer name is required").max(144),
    email: Yup.string().required("Email is required").email("Invalid email format").max(255),
    phone_number: Yup.string().required("Phone number is required").min(8).max(16),
    bio: Yup.string().required("Bio is required").max(500),
    address: Yup.string().required("Address is required").max(255),
    password: Yup.string().required("Password is required").min(6).max(36),
    password_confirmation: Yup.string().required("Password confirmation is required").oneOf([Yup.ref("password")], "Passwords must match"),
})

type RegisterEventOrganizerFormValues = Yup.InferType<typeof registerSchema>

interface IOrganismRegisterEventOrganizerFormProps {}

const OrganismRegisterEventOrganizerForm: React.FunctionComponent<IOrganismRegisterEventOrganizerFormProps> = () => {
    const { onLoginStore } = useAuthStore()
    const router = useRouter()

    const form = useForm<RegisterEventOrganizerFormValues>({
        resolver: yupResolver(registerSchema),
        defaultValues: {
            username: "",
            organizer_name: "",
            email: "",
            phone_number: "",
            bio: "",
            address: "",
            password: "",
            password_confirmation: "",
        }
    })

    const onSubmit = async (values: RegisterEventOrganizerFormValues) => {
        try {
            Swal.fire({
                title: "Creating account...",
                text: "Please wait a moment",
                allowOutsideClick: false,
                didOpen: () => Swal.showLoading()
            })
    
            const message = await registerEventOrganizerRepo(values)
    
            Swal.fire({
                icon: "success",
                title: "Success",
                text: message,
                showConfirmButton: false
            })
    
            router.push("/")
        } catch (err: any) {
            Swal.fire("I'm sorry", err.response?.data?.message ?? "Something went wrong", "error")
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField control={form.control} name="username"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Username</FormLabel>
                            <FormControl>
                                <Input placeholder="Enter your username" {...field} />
                            </FormControl>
                            <FormMessage>{form.formState.errors.username?.message}</FormMessage>
                        </FormItem>
                    )}/>
                <FormField control={form.control} name="organizer_name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Organizer Name</FormLabel>
                            <FormControl>
                                <Input placeholder="Enter your organizer name" {...field} />
                            </FormControl>
                            <FormMessage>{form.formState.errors.organizer_name?.message}</FormMessage>
                        </FormItem>
                    )}/>
                <FormField control={form.control} name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Email Address</FormLabel>
                            <FormControl>
                                <Input type="email" placeholder="Enter your email" {...field} />
                            </FormControl>
                            <FormMessage>{form.formState.errors.email?.message}</FormMessage>
                        </FormItem>
                    )}/>
                <FormField control={form.control} name="phone_number"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Phone Number</FormLabel>
                            <FormControl>
                                <Input placeholder="Enter your phone number" {...field} />
                            </FormControl>
                            <FormMessage>{form.formState.errors.phone_number?.message}</FormMessage>
                        </FormItem>
                    )}/>
                <FormField control={form.control} name="bio"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Bio</FormLabel>
                            <FormControl>
                                <Textarea placeholder="Tell us about your organizer..." {...field} />
                            </FormControl>
                            <FormMessage>{form.formState.errors.bio?.message}</FormMessage>
                        </FormItem>
                    )}/>
                <FormField control={form.control} name="address"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Address</FormLabel>
                            <FormControl>
                                <Textarea placeholder="Enter your address" {...field} />
                            </FormControl>
                            <FormMessage>{form.formState.errors.address?.message}</FormMessage>
                        </FormItem>
                    )}/>
                <FormField control={form.control} name="password"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                                <Input type="password" placeholder="Enter your password" {...field} />
                            </FormControl>
                            <FormMessage>{form.formState.errors.password?.message}</FormMessage>
                        </FormItem>
                    )}/>
                <FormField control={form.control} name="password_confirmation"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Confirm Password</FormLabel>
                            <FormControl>
                                <Input type="password" placeholder="Confirm your password" {...field} />
                            </FormControl>
                            <FormMessage>{form.formState.errors.password_confirmation?.message}</FormMessage>
                        </FormItem>
                    )}/>
                <Button type="submit" className="mt-3" disabled={form.formState.isSubmitting}>
                    {form.formState.isSubmitting ? "Creating your account..." : "Create My Account!"}
                </Button>
            </form>
        </Form>
    )
}

export default OrganismRegisterEventOrganizerForm