"use client";

import React, { useState } from "react";
import * as z from "zod";
import { Billboard, Category, Color } from "@prisma/client";
import Header from "@/components/Dashboard/heading";
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-hot-toast";
import { useForm } from "react-hook-form";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input";

import axios from "axios";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { AlertModal } from "@/components/Dashboard/alert-modal";

interface CategoryFormProps {
    initialData: Color | null | undefined;
}

const formSchema = z.object({
    name: z.string().min(2).max(50),
    value: z.string().min(3).startsWith("#").max(7)
});
export const ColorForm: React.FC<CategoryFormProps> = ({ initialData }) => {
    const params = useParams();
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: initialData || {
            name: '',
            value: ''
        },
    });

    async function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            setLoading(true);
            if (initialData) {
                await axios.patch(`/api/store/${params.storeId}/color/${params.colorId}`, values);
            }
            else {
                await axios.post(`/api/store/${params.storeId}/color`, values);
            }
            router.refresh();
            toast.success(`${initialData ? "Color updated Succesfully" : "Color Created"}`);
        } catch (error) {
            toast.error("Something went wrong");
        } finally {
            setLoading(false);
        }
    }

    async function onDelete() {
        try {
            setLoading(true);
            await axios.delete(`/api/store/${params.storeId}/color/${params.colorId}`);
            router.refresh();
            router.push(`/admin/${params.storeId}/color`);
            toast.success("Category deleted");
        } catch (error) {
            toast.error(
                "Make sure you removed all the products and categories first."
            );
        } finally {
            setLoading(false);
            setOpen(false);
        }
    }
    return (
        <>
            <AlertModal
                isOpen={open}
                loading={loading}
                onClose={() => setOpen(false)}
                onConfirm={onDelete}
            />
            <div className="flex items-center justify-between">
                <Header title={`${initialData ? "Edit Color" : "Create Color"}`} description={`${initialData ? "Edit a Color" : "Add a new Color"}`} />
                {initialData && <Button
                    variant="destructive"
                    onClick={() => {
                        setOpen(true);
                    }}
                    size="icon"
                    disabled={loading}>
                    <Trash className="w-4 h-4" />
                </Button>}
            </div>
            <Separator />
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <div className="grid grid-cols-3 gap-8 ">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Color name"
                                            {...field}
                                            disabled={loading}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="value"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Value</FormLabel>
                                    <div className="flex gap-4 items-center">

                                        <FormControl>
                                            <Input
                                                placeholder="Color Value"
                                                {...field}
                                                disabled={loading}
                                            />
                                        </FormControl>
                                        <div style={{ backgroundColor: field.value }} className={`rounded-full p-4`}></div>

                                    </div>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                    </div>
                    <Button disabled={loading} type="submit">
                        {initialData ? "Save changes" : "Create Color"}
                    </Button>
                </form>
            </Form>
            <Separator />
        </>
    );
};
