'use client'
import React, { useState } from 'react'
import { useForm } from "react-hook-form"
import { Button } from '../ui/button'
import Swal from 'sweetalert2'
import * as Yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup"
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Input } from "@/components/ui/input"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUpload } from '@fortawesome/free-solid-svg-icons'
import { loadingHelper } from '@/helpers/loading.helper'
import { postUpdateTransactionRepo } from '@/repositories/r_transaction'

interface IOrganismAddTransactionReceiptFormProps {
    id: string
    action: () => void
}

interface TransactionReceiptFormValues {
    transaction_evidence: FileList
}

const MAX_FILE_SIZE = 10 * 1024 * 1024 
const SUPPORTED_TYPES = ["image/png", "image/jpg", "image/jpeg"]

const validationSchema = Yup.object({
    transaction_evidence: Yup.mixed<FileList>()
        .required("Transaction evidence is required")
        .test(
            "fileSize",
            "File size must not exceed 10 MB",
            (value) => {
                return value && value.length > 0 && value[0].size <= MAX_FILE_SIZE
            }
        )
        .test(
            "fileType",
            "Only PNG, JPG, and JPEG files are allowed",
            (value) => {
                return value && value.length > 0 && SUPPORTED_TYPES.includes(value[0].type)
            }
        )
})

const OrganismAddTransactionReceiptForm: React.FunctionComponent<IOrganismAddTransactionReceiptFormProps> = ({ action, id }) => {
    const [open, setOpen] = useState(false)
    const form = useForm<TransactionReceiptFormValues>({
        resolver: yupResolver(validationSchema),
    })

    const onSubmit = async (values: TransactionReceiptFormValues) => {
        try {
            loadingHelper('Uploading transaction evidence')
            const file = values.transaction_evidence?.[0] ?? null
            const payload = { img: file }
            const message = await postUpdateTransactionRepo(payload, id)

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
                <Button className='py-0 text-sm'>
                    <FontAwesomeIcon icon={faUpload}/>
                </Button> 
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Add Transaction Receipt</DialogTitle>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <FormField
                            control={form.control}
                            name="transaction_evidence"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Transaction Evidence</FormLabel>
                                    <FormControl>
                                        <Input type="file" accept=".png,.jpg,.jpeg"  onChange={(e) => field.onChange(e.target.files)}/>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button type="submit" className="w-full">Submit</Button>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}

export default OrganismAddTransactionReceiptForm