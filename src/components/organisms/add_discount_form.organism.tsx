'use client'
import React, { useState } from 'react'
import { Button } from '../ui/button'
import Swal from 'sweetalert2'
import * as Yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup"
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Input } from '../ui/input'
import { useForm } from 'react-hook-form'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTicket } from '@fortawesome/free-solid-svg-icons'
import { Textarea } from '../ui/textarea'
import { createDiscountRepo } from '@/repositories/r_discount'
import { loading } from '@/helpers/loading.helper'

interface IOrganismAddDiscountFormProps {
    action: () => void
}

// Validation
const discountSchema = Yup.object({
    description: Yup.string().required("Description is required").max(144),
    percentage: Yup.number().transform((value, originalValue) =>
        originalValue === "" ? undefined : Number(originalValue)
    ).typeError("Percentage must be a number")
    .required("Percentage is required")
    .min(1, "Minimum is 1%")
    .max(100, "Maximum is 100%")
})

type DiscountFormValues = Yup.InferType<typeof discountSchema>

const OrganismAddDiscountForm: React.FunctionComponent<IOrganismAddDiscountFormProps> = ({ action }) => {
    const form = useForm<DiscountFormValues>({ resolver: yupResolver(discountSchema), defaultValues: { description:"", percentage:1 }})
    // State management
    const [open, setOpen] = useState(false)
    const onSubmit = async (values: DiscountFormValues) => {
        try {
            loading('Creating discount')
            const message = await createDiscountRepo(values)
            setOpen(false)
            Swal.close()
        
            const result = await Swal.fire({
                title: "Success",
                text: message,
                icon: "success",
                allowOutsideClick: false,
                allowEscapeKey: false,
            })
    
            if (result.isConfirmed) {
                action()
                form.reset()
            }
        } catch (err: any) {
            Swal.fire("I'm sorry", err.response?.data?.message ?? "Something went wrong", "error")        
        }
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button className='py-0 text-sm'><FontAwesomeIcon icon={faTicket}/>Add Discount</Button> 
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Add Discount</DialogTitle>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <FormField control={form.control} name="percentage"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Percentage</FormLabel>
                                    <FormControl>
                                        <Input type="number" placeholder="Enter your discount percentage" {...field} max={100} min={1}/>
                                    </FormControl>
                                    <FormMessage>{form.formState.errors.percentage?.message}</FormMessage>
                                </FormItem>
                            )}
                        />
                        <FormField control={form.control} name="description"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Description</FormLabel>
                                    <FormControl>
                                        <Textarea placeholder="Enter your description" {...field} />
                                    </FormControl>
                                    <FormMessage>{form.formState.errors.description?.message}</FormMessage>
                                </FormItem>
                            )}
                        />
                        <Button type="submit" disabled={form.formState.isSubmitting}>
                            { form.formState.isSubmitting ? "Sending..." : "Send Discount" }
                        </Button>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}

export default OrganismAddDiscountForm;
