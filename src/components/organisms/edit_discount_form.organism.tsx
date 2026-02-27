'use client'
import React from 'react'
import { Button } from '../ui/button'
import Swal from 'sweetalert2'
import * as Yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup"
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Input } from '../ui/input'
import { useForm } from 'react-hook-form'
import { Textarea } from '../ui/textarea'
import MoleculeDiscountBox from '../molecules/discount_box.molecule'

interface IOrganismEditDiscountFormProps {
    percentage: number 
    description: string
    role: string
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

const OrganismEditDiscountForm: React.FunctionComponent<IOrganismEditDiscountFormProps> = ({ percentage, description, role }) => {
    const form = useForm<DiscountFormValues>({ resolver: yupResolver(discountSchema), defaultValues: { description, percentage }})

    const onSubmit = async (values: DiscountFormValues) => {
        try {
            
        } catch (err: any) {
            Swal.fire("I'm sorry", err.response?.data?.message ?? "Something went wrong", "error")        
        }
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
            <div>
                <MoleculeDiscountBox description={description} percentage={percentage} expiredAt={'10 Jun 2026'} role={role}/>
                </div>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Edit Discount</DialogTitle>
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
                            { form.formState.isSubmitting ? "Sending..." : "Save Changes" }
                        </Button>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}

export default OrganismEditDiscountForm;
