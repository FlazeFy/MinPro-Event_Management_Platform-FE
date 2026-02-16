"use client"
import * as React from 'react'
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as Yup from "yup"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form"
import { useRouter } from "next/navigation"
import AtomText from '../atoms/text.atom'
import { loginRepo } from '@/repositories/r_auth'
import Swal from "sweetalert2"
import useAuthStore from '@/store/s_auth'

// Validation
const loginSchema = Yup.object({
    email: Yup.string().required("Email is required").min(10).test(
        "is-gmail",
        "Email must end with @gmail.com",
        (val: string) => val ? val.endsWith("@gmail.com") : false
    ),
    password: Yup.string().required("Password is required").min(6),
})

type LoginFormValues = Yup.InferType<typeof loginSchema>

interface IOrganismsLoginFormProps {}

const OrganismsLoginForm: React.FunctionComponent<IOrganismsLoginFormProps> = (props) => {
    const router = useRouter()
    const { onLoginStore } = useAuthStore()
    const form = useForm<LoginFormValues>({ resolver: yupResolver(loginSchema), defaultValues: { email: "", password: "" }})

    const onSubmit = async (values: LoginFormValues) => {
        try {
            // Call repository for login
            const res = await loginRepo({
                email: values.email,
                password: values.password,
            })

            Swal.fire({
                icon: "success",
                title: "Done",
                text: `Welcome ${res.name}!`,
                confirmButtonText: "Explore now!",
                allowOutsideClick: false,
                allowEscapeKey: false,
            }).then((result:any) => {
                // Store local data
                localStorage.setItem('token_key', res.token)
                onLoginStore({ email: res.email, name: res.name, role: res.role })

                // Navigate
                router.push("/")
            })
        } catch (err: any) {
            Swal.fire({
                icon: "error",
                title: "I'm sorry",
                text: err.response.data.message,
            })
        }
    }
    
    return (
        <div className='container'>
            <AtomText type='title' text='Welcome to EventKu' extraClass='mb-0'/>
            <AtomText type='sub-title-small' text='Your next event starts here😉'/>
            <hr className='mt-2 mb-10'/>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <FormField control={form.control} name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email Address</FormLabel>
                                <FormControl>
                                    <Input placeholder="Enter your email" {...field} />
                                </FormControl>
                                <FormMessage>{form.formState.errors.email?.message}</FormMessage>
                            </FormItem>
                        )}
                    />
                    <FormField control={form.control} name="password"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Password</FormLabel>
                                <FormControl>
                                    <Input type="password" placeholder="Enter your password" {...field} />
                                </FormControl>
                                <FormMessage>{form.formState.errors.password?.message}</FormMessage>
                            </FormItem>
                        )}
                    />
                    <Button type="submit" className='mt-3' disabled={form.formState.isSubmitting}>
                        {
                            form.formState.isSubmitting ? "Let me check first..." : "Sign In"
                        }
                    </Button>
                </form>
            </Form>
        </div>
    )
}

export default OrganismsLoginForm;
