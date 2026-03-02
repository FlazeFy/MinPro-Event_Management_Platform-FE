'use client'
import React from 'react'
import { UseFormRegister, FieldErrors } from 'react-hook-form'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'

export interface AttendeeFormValues {
    attendees: {
        fullname: string
        phone_number: string
        birth_date: string
    }[]
}

interface MoleculeAttendeeFormProps {
    index: number
    register: UseFormRegister<AttendeeFormValues>
    errors: FieldErrors<AttendeeFormValues>
    onDelete: () => void
}

const MoleculeAttendeeForm: React.FC<MoleculeAttendeeFormProps> = ({ index, register, errors, onDelete }) => {
    return (
        <div className="space-y-3 rounded-xl border p-4 relative mb-4">
            <Button type="button" variant="destructive" size="xs" className="absolute right-[-10px] top-[-10px] p-0" onClick={onDelete}>
                <FontAwesomeIcon icon={faTrash}/>
            </Button>
            <FormItem>
                <FormLabel>Full Name</FormLabel>
                <FormControl>
                    <Input {...register(`attendees.${index}.fullname`)}/>
                </FormControl>
                <FormMessage>{errors?.attendees?.[index]?.fullname?.message as string}</FormMessage>
            </FormItem>
            <div className='grid grid-cols-12 gap-2 w-full'>
                <div className='col-span-12 sm:col-span-12 md:col-span-6 lg:col-span-6'>
                    <FormItem>
                        <FormLabel>Phone Number</FormLabel>
                        <FormControl>
                            <Input {...register(`attendees.${index}.phone_number`)}/>
                        </FormControl>
                        <FormMessage>{errors?.attendees?.[index]?.phone_number?.message as string}</FormMessage>
                    </FormItem>
                </div>
                <div className='col-span-12 sm:col-span-12 md:col-span-6 lg:col-span-6'>
                    <FormItem>
                        <FormLabel>Birth Date</FormLabel>
                        <FormControl>
                            <Input type="date" {...register(`attendees.${index}.birth_date`)}/>
                        </FormControl>
                        <FormMessage>{errors?.attendees?.[index]?.birth_date?.message as string}</FormMessage>
                    </FormItem>
                </div>
            </div>
        </div>
    )
}

export default MoleculeAttendeeForm