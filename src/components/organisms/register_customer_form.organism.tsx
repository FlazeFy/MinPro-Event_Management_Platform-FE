"use client"
import * as React from 'react'
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as Yup from "yup"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form"
import { useRouter } from "next/navigation"
import useAuthStore from '@/store/s_auth'
import Swal from "sweetalert2"
import { registerCustomerRepo } from '@/repositories/r_auth'

// Validation
const registerSchema = Yup.object({
    username: Yup.string().required("Username is required").min(6).max(36),
    fullname: Yup.string().required("Fullname is required").max(75),
    email: Yup.string().required("Email is required").email("Invalid email format").max(255),
    phone_number: Yup.string().required("Phone number is required").min(8).max(16),
    birth_date: Yup.string()
        .required("Birth date is required")
        .test("is-valid-date", "Birth date must be valid", (value) => {
            return !!value && !isNaN(new Date(value).getTime())
    }),
    password: Yup.string().required("Password is required").min(6).max(36),
    password_confirmation: Yup.string().required("Password confirmation is required").oneOf([Yup.ref("password")], "Passwords must match"),
})

type RegisterCustomerFormValues = Yup.InferType<typeof registerSchema>

interface IOrganismRegisterCustomerFormProps {}

const OrganismRegisterCustomerForm: React.FunctionComponent<IOrganismRegisterCustomerFormProps> = () => {
    const { onLoginStore } = useAuthStore()
    const router = useRouter()

    const form = useForm<RegisterCustomerFormValues>({
        resolver: yupResolver(registerSchema),
        defaultValues: {
            username: "",
            fullname: "",
            email: "",
            phone_number: "",
            birth_date: "",
            password: "",
            password_confirmation: "",
        }
    })

    const onSubmit = async (values: RegisterCustomerFormValues) => {
        try {
            Swal.fire({
                title: "Creating account...",
                text: "Please wait a moment",
                allowOutsideClick: false,
                didOpen: () => Swal.showLoading()
            })

            const payload = {
                ...values,
                birth_date: new Date(values.birth_date).toISOString()
            }
        
            const { message, data } = await registerCustomerRepo(payload)

            // Store local data
            localStorage.setItem('token_key', data.token)
            onLoginStore({ email: data.email, name: data.name, role: data.role })
    
            await Swal.fire({
                icon: "success",
                title: "Success",
                text: message,
                confirmButtonText: "Browse Event Now",
                allowOutsideClick: false,
                allowEscapeKey: false
            }).then((result) => {
                if (result.isConfirmed) router.push("/events")
            })
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
                            <FormLabel className='text-black'>Username</FormLabel>
                            <FormControl>
                                <Input placeholder="Enter your username" {...field} />
                            </FormControl>
                            <FormMessage>{form.formState.errors.username?.message}</FormMessage>
                        </FormItem>
                    )}/>
                <FormField control={form.control} name="fullname"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Fullname</FormLabel>
                            <FormControl>
                                <Input placeholder="Enter your fullname" {...field} />
                            </FormControl>
                            <FormMessage>{form.formState.errors.fullname?.message}</FormMessage>
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
                <FormField control={form.control} name="birth_date"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Birth Date</FormLabel>
                            <FormControl>
                                <Input type="date" {...field} />
                            </FormControl>
                            <FormMessage>{form.formState.errors.birth_date?.message}</FormMessage>
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
                <Button type="submit" className='mt-3' disabled={form.formState.isSubmitting}>
                    { form.formState.isSubmitting ? "Creating your account..." : "Create My Account!" }
                </Button>
            </form>
        </Form>
    )
}

export default OrganismRegisterCustomerForm