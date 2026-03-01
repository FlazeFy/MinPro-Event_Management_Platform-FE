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
import { deleteDiscountByIdRepo, updateDiscountByIdRepo } from '@/repositories/r_discount'
import { loadingHelper } from '@/helpers/loading.helper'

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
    const onUpdate = async (values: DiscountFormValues) => {
        try {
            loadingHelper('Updating discount')
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

    const onDelete = async (id: string) => {
        const confirm = await Swal.fire({
            title: "Are you sure?",
            text: "This discount will be permanently deleted.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, delete it",
            cancelButtonText: "Cancel",
            reverseButtons: true,
        })
        if (!confirm.isConfirmed) return
    
        try {
            loadingHelper('Deleting discount')
            const message = await deleteDiscountByIdRepo(id)
    
            Swal.close()
            setOpen(false)
    
            const result = await Swal.fire({
                title: "Success",
                text: message,
                icon: "success",
                allowOutsideClick: false,
                allowEscapeKey: false,
            })
    
            if (result.isConfirmed) action()
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
                    <form onSubmit={form.handleSubmit(onUpdate)} className="space-y-4">
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
                        <div className='flex flex-wrap gap-2 justify-between'>
                            <Button type="submit" disabled={form.formState.isSubmitting}>
                                { form.formState.isSubmitting ? "Sending..." : "Save Changes" }
                            </Button>
                            <Button type='button' variant='destructive' onClick={() => onDelete(id)}>Delete</Button>
                        </div>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}

export default OrganismEditDiscountForm;
