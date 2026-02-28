'use client'
import React, { useState } from 'react'
import { Button } from '../ui/button'
import Swal from 'sweetalert2'
import * as Yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup"
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { useForm } from 'react-hook-form'
import { Textarea } from '../ui/textarea'
import MoleculeDiscountBox from '../molecules/discount_box.molecule'
import { updateDiscountByIdRepo } from '@/repositories/r_discount'

interface IOrganismEditDiscountFormProps {
    id: string
    percentage: number 
    description: string
    role: string
    action: () => void
}

// Validation
const discountSchema = Yup.object({
    description: Yup.string().required("Description is required").max(144),
})

type DiscountFormValues = Yup.InferType<typeof discountSchema>

const OrganismEditDiscountForm: React.FunctionComponent<IOrganismEditDiscountFormProps> = ({ percentage, description, role, action, id }) => {
    const form = useForm<DiscountFormValues>({ resolver: yupResolver(discountSchema), defaultValues: { description }})
    // State management
    const [open, setOpen] = useState(false)
    const onSubmit = async (values: DiscountFormValues) => {
        try {
            const message = await updateDiscountByIdRepo(values, id)
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
