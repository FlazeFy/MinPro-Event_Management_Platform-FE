'use client'
import React from 'react'
import AtomText from '../atoms/text.atom'
import AtomDivider from '../atoms/divider.atom'
import MoleculeNominalBox from '../molecules/nominal_box.molecule'
import MoleculeCopyBox from '../molecules/copy_box.molecule'
import { Button } from '../ui/button'
import Swal from 'sweetalert2'
import * as Yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup"
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Input } from '../ui/input'
import { useForm } from 'react-hook-form'
import { createUseRefCodeRepo } from '@/repositories/r_ref_code'

interface IOrganismPointRefCodeBoxProps {
    points: number
    referral_code: string
    is_used: boolean
    action: () => void
}

// Validation
const refCodeSchema = Yup.object({
    referral_code: Yup.string().required("Referral code is required").max(6).min(6),
})

type RefCodeFormValues = Yup.InferType<typeof refCodeSchema>

const OrganismPointRefCodeBox: React.FunctionComponent<IOrganismPointRefCodeBoxProps> = ({ points, referral_code, is_used, action }) => {
    const form = useForm<RefCodeFormValues>({ resolver: yupResolver(refCodeSchema), defaultValues: { referral_code: "" }})

    const onSubmit = async (values: RefCodeFormValues) => {
        try {
            Swal.fire({
                title: "Sending request...",
                text: "Please wait a moment",
                allowOutsideClick: false,
                didOpen: () => Swal.showLoading()
            })

            // Call repository for send redeem
            const res = await createUseRefCodeRepo({
                referral_code: values.referral_code
            })
            form.reset()

            Swal.fire({
                icon: "success",
                title: "Done",
                text: res,
                confirmButtonText: "Continue explore!"
            }).then((result) => {
                if (result.isConfirmed) action()
            })
        } catch (err: any) {
            Swal.fire("I'm sorry", err.response?.data?.message ?? "Something went wrong", "error")        
        }
    }

    return (
        <div className='container'>
            <AtomText type='sub-title' text='Your Rewards' extraClass='mb-2'/>
            <MoleculeNominalBox label='Available Points' value={points}/>
            { 
                is_used === false && 
                    <div className='mb-4'>
                        <AtomText type='content' text='Do you have referral code from other user?' extraClass='mb-1'/>
                        <Dialog>
                            <DialogTrigger asChild>
                                <Button className='py-0 text-sm'>Redeem It Now!</Button> 
                            </DialogTrigger>
                            <DialogContent>
                                <DialogHeader>
                                    <DialogTitle>Redeem Referral Code</DialogTitle>
                                </DialogHeader>
                                <Form {...form}>
                                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                                        <FormField control={form.control} name="referral_code"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Referral Code</FormLabel>
                                                    <FormControl>
                                                        <Input placeholder="Type your ref code" {...field} />
                                                    </FormControl>
                                                    <FormMessage>{form.formState.errors.referral_code?.message}</FormMessage>
                                                </FormItem>
                                            )}
                                        />
                                        <Button type="submit" disabled={form.formState.isSubmitting}>
                                            { form.formState.isSubmitting ? "Sending..." : "Send Request" }
                                        </Button>
                                    </form>
                                </Form>
                            </DialogContent>
                        </Dialog>
                    </div>
            }
            <AtomDivider/>
            <AtomText type='content' text='Ref Code' extraClass='mb-2'/>
            <MoleculeCopyBox value={referral_code} context='Referral Code'/>
        </div>
    )
}

export default OrganismPointRefCodeBox;
