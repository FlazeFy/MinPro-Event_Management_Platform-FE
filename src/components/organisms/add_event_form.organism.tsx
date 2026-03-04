"use client"
import React, { useState } from 'react'
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as Yup from "yup"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form"
import { useRouter } from "next/navigation"
import Swal from "sweetalert2"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons'
import { Textarea } from '../ui/textarea'
import { Checkbox } from "@/components/ui/checkbox"
import AtomText from '../atoms/text.atom'
import AtomDivider from '../atoms/divider.atom'
import OrganismEventImagePicker from './event_image_picker.organism'
import { loadingHelper } from '@/helpers/loading.helper'
import { postCreateEventRepo } from '@/repositories/r_event'

// Validation
const addEventSchema = Yup.object({
    event_title: Yup.string().required("Event title is required").max(144),
    event_desc: Yup.string().required("Event description is required").max(500),
    event_category: Yup.mixed().oneOf(["concert","live_music","theater"]).required("Event category is required"),
    is_paid: Yup.boolean().required(),
    event_price: Yup.number().default(0).transform((value, originalValue) => Number(originalValue)).min(0).when("is_paid", { is: true, then: (schema) => schema.required("Event price is required") }),
    maximum_seat: Yup.number().default(0).transform((value, originalValue) => Number(originalValue)).min(1, "Maximum seat must be at least 1").required(),
    start_date: Yup.date().required("Start date is required"),
    end_date: Yup.date().min(Yup.ref("start_date"), "End date must be after start date").required("End date is required"),
    description: Yup.string().max(144).nullable().defined(),
})

type AddEventFormValues = Yup.InferType<typeof addEventSchema> & {
    img?: File | null
}

interface IOrganismAddEventFormProps {
    selectedVenue: string | null
}

const OrganismAddEventForm: React.FunctionComponent<IOrganismAddEventFormProps> = ({ selectedVenue }) => {
    // For state management
    const router = useRouter()
    const [isPaidEvent, setIsPaidEvent] = useState(false)

    // Set default date
    const tomorrow = new Date()
    tomorrow.setDate(tomorrow.getDate() + 1) 
    const defaultStart = new Date(tomorrow)
    defaultStart.setHours(10, 0, 0, 0) 
    const defaultEnd = new Date(defaultStart)
    defaultEnd.setHours(defaultStart.getHours() + 3) 

    const form = useForm<AddEventFormValues>({
        resolver: yupResolver(addEventSchema),
        defaultValues: {
            event_title: "",
            event_desc: "",
            event_category: "concert",
            is_paid: false,
            event_price: 0,
            maximum_seat: 100,
            start_date: defaultStart,
            end_date: defaultEnd,
            description: "",
        }
    })

    const onSubmit = async (values: AddEventFormValues) => {
        try {
            loadingHelper("Creating event")
            const payload = {
                ...values,
                venue_id: selectedVenue!,
                start_date: values.start_date.toISOString(),
                end_date: values.end_date.toISOString(),
                img: values.img ?? null
            }

            const { message, data } = await postCreateEventRepo(payload)

            await Swal.fire({
                icon: "success",
                title: "Success",
                text: message,
                confirmButtonText: "See created event",
                allowOutsideClick: false,
                allowEscapeKey: false
            }).then((result) => {
                if (result.isConfirmed) router.push(`/event/${data.id}`)
            })
        } catch (err: any) {
            Swal.fire("I'm sorry", err.response?.data?.message ?? "Something went wrong", "error")
        }
    }
    
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <AtomText type='content-title' text='Add Event' extraClass='mb-2'/>
                <FormField
                    control={form.control} name="img" render={({ field }) => (
                        <OrganismEventImagePicker label="Event Image" maxSize={10} value={field.value} onFileSelect={field.onChange}/>
                    )}
                />
                <AtomDivider/>
                <FormField control={form.control} name="event_title" render={({ field }) => (
                    <FormItem>
                        <FormLabel>Event Title</FormLabel>
                        <FormControl>
                            <Input placeholder="Enter event title" {...field} />
                        </FormControl>
                        <FormMessage>{form.formState.errors.event_title?.message}</FormMessage>
                    </FormItem>
                )}/>
                <FormField control={form.control} name="event_desc" render={({ field }) => (
                    <FormItem>
                        <FormLabel>Event Description</FormLabel>
                        <FormControl>
                            <Textarea placeholder="Describe your event" {...field} />
                        </FormControl>
                        <FormMessage>{form.formState.errors.event_desc?.message}</FormMessage>
                    </FormItem>
                )}/>
                <div className='grid grid-cols-2 gap-2'>
                    <FormField control={form.control} name="event_category" render={({ field }) => (
                        <FormItem>
                            <FormLabel>Event Category</FormLabel>
                            <FormControl>
                                <Select onValueChange={field.onChange}>
                                    <SelectTrigger className='w-full me-2'>
                                        <SelectValue placeholder="Select category" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="concert">Concert</SelectItem>
                                        <SelectItem value="live_music">Live Music</SelectItem>
                                        <SelectItem value="theater">Theater</SelectItem>
                                    </SelectContent>
                                </Select>
                            </FormControl>
                            <FormMessage>{form.formState.errors.event_category?.message}</FormMessage>
                        </FormItem>
                    )}/>
                    <FormField control={form.control} name="maximum_seat" render={({ field }) => (
                        <FormItem>
                            <FormLabel>Maximum Seats</FormLabel>
                            <FormControl>
                                <Input type="number" min={1} onChange={e => field.onChange(Number(e.target.value))} value={field.value ?? 0} />
                            </FormControl>
                            <FormMessage>{form.formState.errors.maximum_seat?.message}</FormMessage>
                        </FormItem>
                    )}/>
                </div>
                <div className='grid grid-cols-2 gap-2'>
                    <FormField control={form.control} name="is_paid" render={({ field }) => (
                        <FormItem className="flex items-center justify-between p-3 border rounded-xl">
                            <FormControl>
                                <Checkbox 
                                    checked={field.value} 
                                    onCheckedChange={(checked) => {
                                        field.onChange(checked === true) 
                                        setIsPaidEvent(checked === true)
                                    }} 
                                />
                            </FormControl>
                            <FormLabel>Is this a paid event?</FormLabel>
                        </FormItem>
                    )}/>
                    <FormField control={form.control} name="event_price" render={({ field }) => (
                        <FormItem>
                            <FormLabel>Event Price</FormLabel>
                            <FormControl>
                                <Input type="number" min={0} disabled={!isPaidEvent} onChange={e => field.onChange(Number(e.target.value))} value={field.value ?? 0}/>
                            </FormControl>
                            <FormMessage>{form.formState.errors.event_price?.message}</FormMessage>
                        </FormItem>
                    )}/>
                </div>
                <AtomDivider/>
                <div className='grid grid-cols-2 gap-2'>
                    <FormField control={form.control} name="start_date" render={({ field }) => (
                        <FormItem>
                            <FormLabel>Start Date</FormLabel>
                            <FormControl>
                                <Input type="datetime-local" value={field.value ? field.value.toISOString().slice(0, 16) : ""}
                                    onChange={e => field.onChange(new Date(e.target.value))}/>
                            </FormControl>
                            <FormMessage>{form.formState.errors.start_date?.message}</FormMessage>
                        </FormItem>
                    )}/>
                    <FormField control={form.control} name="end_date" render={({ field }) => (
                        <FormItem>
                            <FormLabel>End Date</FormLabel>
                            <FormControl>
                                <Input type="datetime-local" value={field.value ? field.value.toISOString().slice(0, 16) : ""}
                                    onChange={e => field.onChange(new Date(e.target.value))}/>
                            </FormControl>
                            <FormMessage>{form.formState.errors.end_date?.message}</FormMessage>
                        </FormItem>
                    )}/>
                </div>
                <FormField control={form.control} name="description" render={({ field }) => (
                    <FormItem>
                        <FormLabel>Schedule Description</FormLabel>
                        <FormControl>
                            <Textarea placeholder="Optional schedule description" {...field} value={field.value ?? ""}/>
                        </FormControl>
                        <FormMessage>{form.formState.errors.description?.message}</FormMessage>
                    </FormItem>
                )}/>
                <Button type="submit" className='w-full'>
                    <FontAwesomeIcon icon={faPaperPlane}/> Publish Event
                </Button>
            </form>
        </Form>
    )
}

export default OrganismAddEventForm;
