'use client'
import React, { useMemo, useState } from 'react'
import { Button } from '../ui/button'
import Swal from 'sweetalert2'
import * as Yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup"
import { Form } from "@/components/ui/form"
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
    // For discount / points selected
    const [selectedDiscount, setSelectedDiscount] = useState<DiscountItem | null>(null)
    const [selectedPoints, setSelectedPoints] = useState<DiscountItem | null>(null)

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

    const handleSelectItem = (item: DiscountItem) => {
        if (item.percentage) selectedDiscount?.id === item.id ? setSelectedDiscount(null) : setSelectedDiscount(item)
        if (item.point) selectedPoints?.id === item.id ? setSelectedPoints(null) : setSelectedPoints(item)
    }

    const totalPrice = useMemo(() => {
        const qty = attendees?.length || 0
        const baseTotal = qty * unitPrice
    
        // Apply percentage discount
        const percentage = selectedDiscount?.percentage ?? 0
        const afterDiscount = baseTotal - (baseTotal * percentage) / 100
    
        // Apply points
        const points = selectedPoints?.point ?? 0
        const finalTotal = afterDiscount - points
    
        return finalTotal > 0 ? finalTotal : 0
    }, [attendees, selectedDiscount, selectedPoints, unitPrice])

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
                discounts: [
                    ...(selectedDiscount ? [{ id: selectedDiscount.id, type: "discount" as const }] : []),
                    ...(selectedPoints ? [{ id: selectedPoints.id, type: "points" as const }] : [])
                ],
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
                                                items.map((dt, idx) => <MoleculeDiscountBox key={dt.id} description={dt.description} percentage={dt.percentage} expiredAt={dt.expired_at} point={dt.point} 
                                                    action={() => handleSelectItem(dt)} 
                                                    selected={selectedDiscount?.id === dt.id || selectedPoints?.id === dt.id}/>)
                                            :
                                                <MoleculeNoDataBox title={'No discount found'} color='gray'/>
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
                                        selectedDiscount && 
                                            <div className='flex gap-2 items-center justify-between mb-2'>
                                                <AtomText type='label' text='Discount'/>
                                                <Badge className='bg-success py-1 px-3'>{`- ${selectedDiscount.percentage}%`}</Badge>
                                            </div>
                                    }
                                    {
                                        selectedPoints && 
                                            <div className='flex gap-2 items-center justify-between'>
                                                <AtomText type='label' text='Points'/>
                                                <Badge className='bg-success py-1 px-3'>{`- Rp. ${selectedPoints.point?.toLocaleString()}`}</Badge>
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
                                                    !isFree && 
                                                        <>
                                                            <SelectItem value="bank_transfer">Bank Transfer</SelectItem>
                                                            <SelectItem value="virtual_account">Virtual Account</SelectItem>
                                                            <SelectItem value="e-payment">E-Payment</SelectItem>
                                                        </>
                                                }
                                                <SelectItem value="free">Free</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        {
                                            form.formState.errors.payment_method && <p className="text-red-500 text-sm mt-1">{form.formState.errors.payment_method.message}</p>
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
