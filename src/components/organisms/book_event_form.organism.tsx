'use client'
import React, { useEffect, useState } from 'react'
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
import { DiscountItem, getDiscountByEventOrganizerIdRepo } from '@/repositories/r_discount'
import MoleculeNoDataBox from '../molecules/no_data_box.molecule'
import Skeleton from 'react-loading-skeleton'
import MoleculeDiscountBox from '../molecules/discount_box.molecule'

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
    // For fetching
    const [items, setItems] = useState<DiscountItem[]>()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [open, setOpen] = useState(false)

    const fetchDiscountByEventOrganizerId = async () => {
        setLoading(true)
        try {
            const data = await getDiscountByEventOrganizerIdRepo('2034f44e-9c06-4f28-badc-6fd67a40d29d')
            setItems(data)
        } catch (err: any) {
            if (err.response?.status === 404 && err.response?.data?.message) {
                setItems([])
                return []
            }
            
            setError(err?.response?.data?.message || "Something went wrong")
        } finally {
            setLoading(false)
        }
    }

    const handleOpenChange = (isOpen: boolean) => {
        setOpen(isOpen)
        if (isOpen) fetchDiscountByEventOrganizerId()
    }

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
        <Dialog onOpenChange={handleOpenChange} open={open}>
            <DialogTrigger asChild>
                <Button className="h-11 rounded-full bg-indigo-600 text-sm font-semibold text-white hover:bg-indigo-700">
                    Book Tickets Now
                </Button>            
            </DialogTrigger>
            <DialogContent style={{minWidth:"1080px"}}>
                <DialogHeader>
                    <DialogTitle>Book Event</DialogTitle>
                </DialogHeader>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-6 max-h-[75vh] overflow-y-auto'>
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
                            <Button type="submit" disabled={form.formState.isSubmitting}>
                                { form.formState.isSubmitting ? "Sending..." : "Book this Event" }
                            </Button>
                        </form>
                    </Form>
                    <div>
                        <AtomText type='content-title' text='Available Discount' extraClass='mb-2'/>
                        { error && <MoleculeNoDataBox title='Something went wrong'/> }
                        { loading && <Skeleton className="h-[200px] w-full rounded-xl" /> }
                        {
                            !loading && !error && items && items.length > 0 ?
                                items.map((dt, idx) => <MoleculeDiscountBox key={idx} description={dt.description} percentage={dt.percentage} expiredAt={dt.expired_at} role={'customer'}/>)
                            :
                                <MoleculeNoDataBox title={'No discount found'}/>
                        }
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default OrganismBookEventForm;
