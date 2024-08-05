"use client"
import { Model } from "@/components/ui/model";
import { useStoreModal } from "@/hooks/use-store-model";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios"
import { redirect, useRouter } from "next/navigation";

const formSchema = z.object({
    name: z.string().min(2, {
        message: "name must be at least 2 characters.",
    }),
})


export const StoreModel = () => {
    const storeModal = useStoreModal()
    const [Loading, setloading] = useState(false)
    const router = useRouter()

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
        },
    })

    async function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            setloading(true);
            const response = await axios.post("/api/store", values);
            toast.success("Store Created");
            window.location.assign(`/admin/${response.data.data.id}`);
        } catch (error) {
            toast.error("Something went Wrong.");
            console.log(error);
        } finally {
            setloading(false);
        }
    }
    return <Model
        title="Create Store"
        description="Add a new store to manage product and categories "
        isOpen={storeModal.isOpen}
        onClose={storeModal.onClose}>
        <div className="space-y-4 pb-4 py-2">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Name</FormLabel>
                                <FormControl>
                                    <Input
                                        disabled={Loading}
                                        placeholder="E-Commerce"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <div className="pt-6 space-x-2 flex items-center justify-end">
                        {/* <Button disabled={Loading} onClick={storeModal.onClose} variant={"outline"}>
                            Cancel
                        </Button> */}
                        <Button disabled={Loading} type="submit">
                            Continue
                        </Button>
                    </div>
                </form>
            </Form>
        </div>
    </Model>


}