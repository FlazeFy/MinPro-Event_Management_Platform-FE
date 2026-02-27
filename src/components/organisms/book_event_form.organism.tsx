'use client'
import React from 'react'
import { Button } from '../ui/button'
import Swal from 'sweetalert2'
import * as Yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup"
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Input } from '../ui/input'
import { useFieldArray, useForm } from 'react-hook-form'
import AtomText from '../atoms/text.atom'
import AtomDivider from '../atoms/divider.atom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import MoleculeAttendeeForm from '../molecules/attendee_form.molecule'

interface IOrganismBookEventFormProps {}

// Validation
const bookEventSchema = Yup.object({
    price: Yup.number().transform((value, originalValue) =>
        originalValue === "" ? undefined : Number(originalValue)
    ).typeError("Price must be a number")
    .required("Price is required")
    .min(0, "Minimum is Rp. 0"),
    attendees: Yup.array()
        .of(
            Yup.object({
                fullname: Yup.string().required("Full name is required"),
                phone: Yup.string().required("Phone is required"),
                birth_date: Yup.string().required("Birth date is required"),
            })
        )
        .required()
        .min(1)
})

type BookEventFormValues = Yup.InferType<typeof bookEventSchema>

const OrganismBookEventForm: React.FunctionComponent<IOrganismBookEventFormProps> = () => {
    const form = useForm<BookEventFormValues>({ resolver: yupResolver(bookEventSchema), defaultValues: { price:0, attendees: [] }})

    const { fields, append, remove } = useFieldArray({
        control: form.control,
        name: 'attendees'
    })
    
    const onSubmit = async (values: BookEventFormValues) => {
        try {
            
        } catch (err: any) {
            Swal.fire("I'm sorry", err.response?.data?.message ?? "Something went wrong", "error")        
        }
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button className="h-11 rounded-full bg-indigo-600 text-sm font-semibold text-white hover:bg-indigo-700">
                    Book Tickets Now
                </Button>            
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Book Event</DialogTitle>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <div className='flex flex-wrap gap-2 justify-between items-center mt-5'>
                            <AtomText text='Attendee' type='content-title'/>
                            <Button onClick={() => append({ fullname: "", phone: "", birth_date: "" })}>
                                <FontAwesomeIcon icon={faPlus}/>Add Attendee
                            </Button>
                        </div>
                        {
                            fields.map((field, index) => (
                                <MoleculeAttendeeForm key={field.id} index={index} register={form.register} errors={form.formState.errors} onDelete={() => remove(index)}/>
                            ))
                        }
                        <AtomDivider/>
                        <FormField control={form.control} name="price"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Price</FormLabel>
                                    <FormControl>
                                        <Input type="number" disabled={true} {...field} min={1}/>
                                    </FormControl>
                                    <FormMessage>{form.formState.errors.price?.message}</FormMessage>
                                </FormItem>
                            )}
                        />
                        <Button type="submit" disabled={form.formState.isSubmitting} className='w-full'>
                            { form.formState.isSubmitting ? "Sending..." : "Book this Event" }
                        </Button>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}

export default OrganismBookEventForm;
