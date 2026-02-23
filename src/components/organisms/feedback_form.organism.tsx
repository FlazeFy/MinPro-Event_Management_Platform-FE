'use client'
import * as React from 'react'
import AtomText from '../atoms/text.atom';
import { useForm, Controller } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import { Button } from "@/components/ui/button"
import { Textarea } from '@/components/ui/textarea'
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form"
import Swal from "sweetalert2"
import * as Yup from "yup"
import AtomStarInput from '../atoms/star_input.atom';
import { createFeedbackRepo } from '@/repositories/r_feedback';

// Validation
const feedbackSchema = Yup.object({
    feedback_rate: Yup.number().required("Feedback rate is required").min(1, "Minimum rating is 1").max(5, "Maximum rating is 5"),
    feedback_body: Yup.string().required("Feedback body is required").max(255),
})

type FeedbackFormValues = Yup.InferType<typeof feedbackSchema>

interface IOrganismFeedbackBoxProps {}

const OrganismFeedbackBox: React.FunctionComponent<IOrganismFeedbackBoxProps> = () => {
    const form = useForm<FeedbackFormValues>({ resolver: yupResolver(feedbackSchema), defaultValues: { feedback_rate: 0, feedback_body: "" }})

    const onSubmit = async (values: FeedbackFormValues) => {
        try {
            // Call repository for send feedback
            const res = await createFeedbackRepo({
                feedback_rate: values.feedback_rate,
                feedback_body: values.feedback_body,
            })
            form.reset()

            Swal.fire({
                icon: "success",
                title: "Done",
                text: res,
                confirmButtonText: "Continue explore!"
            })
        } catch (err: any) {
            Swal.fire("I'm sorry", err.response?.data?.message ?? "Something went wrong", "error")        
        }
    }

    return (
        <div className="max-w-[720px] w-full mt-[5vh] p-5 pb-20 lg:p-10 lg:pb-40 text-center mx-auto">
            <AtomText type='title-huge' text="Give Us Feedback" extraClass='mb-0'/>
            <AtomText type='content' text="We'd love to hear your thoughts on our app's features and design. Your feedback means a lot to us!" extraClass='mb-10'/>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <Controller control={form.control} name="feedback_rate" render={({ field }) => (
                        <FormItem>
                            <FormLabel>Rate us from 1 - 5</FormLabel>
                            <FormControl>
                                <AtomStarInput id="feedback_rate-input" value={field.value} handleChange={field.onChange} />
                            </FormControl>
                            <FormMessage>{form.formState.errors.feedback_rate?.message}</FormMessage>
                        </FormItem>
                        )}
                    />
                    <FormField control={form.control} name="feedback_body"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Feedback</FormLabel>
                                <FormControl>
                                    <Textarea style={{minHeight:"160px"}} placeholder="Type your feedback" {...field} />
                                </FormControl>
                                <FormMessage>{form.formState.errors.feedback_body?.message}</FormMessage>
                            </FormItem>
                        )}
                    />
                    <Button type="submit" disabled={form.formState.isSubmitting}>
                        { form.formState.isSubmitting ? "Sending..." : "Send Feedback" }
                    </Button>
                </form>
            </Form>
        </div>
    )
}

export default OrganismFeedbackBox;
