'use client'
import React, { useEffect, useMemo, useState } from 'react'
import { Button } from '../ui/button'
import Swal from 'sweetalert2'
import * as Yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup"
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { useFieldArray, useForm } from 'react-hook-form'
import AtomText from '../atoms/text.atom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import MoleculeAttendeeForm from '../molecules/attendee_form.molecule'
import { DiscountItem, getDiscountByEventOrganizerIdRepo } from '@/repositories/r_discount'
import MoleculeNoDataBox from '../molecules/no_data_box.molecule'
import Skeleton from 'react-loading-skeleton'
import MoleculeDiscountBox from '../molecules/discount_box.molecule'
import { Badge } from '../ui/badge'
import { createTransactionRepo } from '@/repositories/r_transaction'
import { useRouter } from "next/navigation"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import { parseApiErrorMessage } from '@/helpers/converter.helper'
import { loadingHelper } from '@/helpers/loading.helper'

interface IOrganismBookEventFormProps {
    id: string
    eventOrganizerId: string
    unitPrice: number
    isFree: boolean
}

// Validation
const bookEventSchema = Yup.object({
    payment_method: Yup.string().required("Payment method is required"),
    attendees: Yup.array()
        .of(
            Yup.object({
                fullname: Yup.string().required("Full name is required"),
                phone_number: Yup.string().required("Phone is required"),
                birth_date: Yup.string().required("Birth date is required"),
            })
        )
        .required()
        .min(1)
})

type BookEventFormValues = Yup.InferType<typeof bookEventSchema>

const OrganismBookEventForm: React.FunctionComponent<IOrganismBookEventFormProps> = ({ eventOrganizerId, unitPrice, isFree, id }) => {
    const form = useForm<BookEventFormValues>({ resolver: yupResolver(bookEventSchema), defaultValues: { 
        attendees: [],
        payment_method: isFree ? "free" : ""
    }})
    const attendees = form.watch("attendees")
    // For state management
    const router = useRouter()
    // For fetching
    const [items, setItems] = useState<DiscountItem[]>()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [open, setOpen] = useState(false)
    const [discountSelected, setDiscountSelected] = useState<DiscountItem | null>(null)

    const fetchDiscountByEventOrganizerId = async (eventOrganizerId: string) => {
        setLoading(true)
        try {
            const data = await getDiscountByEventOrganizerIdRepo(eventOrganizerId)
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
        if (isOpen) fetchDiscountByEventOrganizerId(eventOrganizerId)
    }

    const handleSelectDiscount = (discount: DiscountItem) => {
        discountSelected?.id === discount.id ? setDiscountSelected(null) : setDiscountSelected(discount)
    }

    const totalPrice = useMemo(() => {
        const qty = attendees?.length || 0
        const discountPercentage = discountSelected?.percentage ?? 0
        const discountedUnitPrice = unitPrice - (unitPrice * discountPercentage) / 100
        return qty * discountedUnitPrice
    }, [attendees, discountSelected, unitPrice])

    const { fields, append, remove } = useFieldArray({
        control: form.control,
        name: 'attendees'
    })
    
    const onSubmit = async (values: BookEventFormValues) => {
        try {
            setOpen(false)
            loadingHelper('Creating the payment')
            const payload = {
                payment_method: values.payment_method,
                attendees: values.attendees.map((dt) => ({
                    fullname: dt.fullname,
                    phone_number: dt.phone_number,
                    birth_date: dt.birth_date
                })),
                discount_id: discountSelected?.id ?? null,
                event_id: id
            }
    
            const res = await createTransactionRepo(payload)
    
            Swal.fire({
                icon: "success",
                title: "Done",
                text: res,
                confirmButtonText: "Continue explore!",
                allowOutsideClick: false,
                allowEscapeKey: false,
            }).then(() => {
                // Navigate
                router.push("/event")
            })
        } catch (err: any) {
            Swal.fire("I'm sorry", parseApiErrorMessage(err), "error")        
        }
    }

    return (
        <Dialog onOpenChange={handleOpenChange} open={open}>
            <DialogTrigger asChild>
                <Button className="h-11 rounded-full bg-indigo-600 text-sm font-semibold text-white hover:bg-indigo-700">
                    Book Tickets Now!
                </Button>            
            </DialogTrigger>
            <DialogContent style={{minWidth: isFree ? "auto" : "1080px"}}>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <DialogHeader>
                            <DialogTitle>Book Event</DialogTitle>
                        </DialogHeader>
                        <div className={`${!isFree ? 'grid grid-cols-1 md:grid-cols-2' : '' } gap-6 max-h-[75vh] overflow-y-auto`}>
                            <div>
                                <div className='flex flex-wrap gap-2 justify-between items-center my-5'>
                                    <AtomText text='Attendee' type='content-title'/>
                                    <Button onClick={() => append({ fullname: "", phone_number: "", birth_date: "" })}>
                                        <FontAwesomeIcon icon={faPlus}/>Add Attendee
                                    </Button>
                                </div>
                                {
                                    fields.length > 0 ?
                                        fields.map((field, index) => (
                                            <MoleculeAttendeeForm key={field.id} index={index} register={form.register} errors={form.formState.errors} onDelete={() => remove(index)}/>
                                        ))
                                    :
                                        <MoleculeNoDataBox title='No attendee added'/>
                                }
                            </div>
                            {
                                !isFree ?
                                    <div>
                                        <AtomText type='content-title' text='Available Discount' extraClass='mb-2'/>
                                        { error && <MoleculeNoDataBox title='Something went wrong'/> }
                                        { loading && <Skeleton className="h-[200px] w-full rounded-xl" /> }
                                        {
                                            !loading && !error && items && items.length > 0 ?
                                                items.map((dt, idx) =>     <MoleculeDiscountBox key={dt.id} description={dt.description} percentage={dt.percentage} expiredAt={dt.expired_at} role="customer" action={() => handleSelectDiscount(dt)} selected={discountSelected?.id === dt.id}/>)
                                            :
                                                <MoleculeNoDataBox title={'No discount found'}/>
                                        }
                                    </div>
                                : 
                                    <></>
                            }
                        </div>
                        <DialogFooter>
                            <div className='flex flex-wrap gap-2 items-center justify-between w-full'>
                                <div className='text-start'>
                                    {
                                        discountSelected &&
                                            <div className='flex flex-wrap gap-2 items-center'>
                                                <AtomText type='label' text='Selected Discount'/>
                                                <Badge className='bg-success py-1 px-3'>{`- ${discountSelected.percentage}%`}</Badge>
                                            </div>
                                    }
                                    <AtomText type='content-title' text={`Total Price : Rp. ${totalPrice.toLocaleString()}`}/>
                                </div>
                                <div className='flex flex-wrap gap-4 items-center'>
                                    <div>
                                        <AtomText text="Payment Method" type="label"/>
                                        <Select onValueChange={(value) => form.setValue("payment_method", value)} defaultValue={form.getValues("payment_method")}>
                                            <SelectTrigger className="w-full">
                                                <SelectValue placeholder="Select payment method" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {
                                                    !isFree && (
                                                        <>
                                                            <SelectItem value="bank_transfer">Bank Transfer</SelectItem>
                                                            <SelectItem value="virtual_account">Virtual Account</SelectItem>
                                                            <SelectItem value="e-payment">E-Payment</SelectItem>
                                                        </>
                                                    )
                                                }
                                                <SelectItem value="free">Free</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        {
                                            form.formState.errors.payment_method && (
                                                <p className="text-red-500 text-sm mt-1">{form.formState.errors.payment_method.message}</p>
                                            )
                                        }
                                    </div>
                                    <Button type="submit" disabled={form.formState.isSubmitting}>
                                        { form.formState.isSubmitting ? "Sending..." : "Book this Event" }
                                    </Button>
                                </div>
                            </div>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}

export default OrganismBookEventForm;
