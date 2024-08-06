"use client";

import React, { useState } from "react";
import * as z from "zod";
import { Billboard, Category, Image, Product } from "@prisma/client";
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
import { Input } from "@/components/ui/input";

import axios from "axios";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { AlertModal } from "@/components/Dashboard/alert-modal";
import ImageUpload from "./image-upload";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface BillBoardFormProps {
    initialData: Product & {
        imageUrl: Image[]
    } | null | undefined;
    category: Category[] | null | undefined
}

const formSchema = z.object({
    name: z.string().min(2).max(50),
    images: z.object({ url: z.string() }).array(),
    price: z.coerce.number(),
    categoryId: z.string().min(2).max(50),
    colorId: z.string().min(2).max(50),
    sizeId: z.string().min(2).max(50),
    isFeatured: z.boolean().optional(),
    isArchived: z.boolean().optional()
});
export const ProductForm: React.FC<BillBoardFormProps> = ({ initialData, category }) => {
    const params = useParams();
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: initialData ? { ...initialData, price: parseFloat(String(initialData?.price)) } : {
            name: '',
            images: [],
            price: 0,
            categoryId: '',
            colorId: '',
            sizeId: '',
            isFeatured: false,
            isArchived: false


        },
    });

    async function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            setLoading(true);
            if (initialData) {
                await axios.patch(`/api/store/${params.storeId}/billboards/${params.billboardId}`, values);
            }
            else {
                await axios.post(`/api/store/${params.storeId}/billboards`, values);
            }
            router.refresh();
            toast.success(`${initialData ? "BillBoard updated Succesfully" : "BillBoard Created"}`);
        } catch (error) {
            toast.error("Something went wrong");
        } finally {
            setLoading(false);
        }
    }

    async function onDelete() {
        try {
            setLoading(true);
            await axios.delete(`/api/store/${params.storeId}/billboards/${params.billboardId}`);
            router.refresh();
            router.push(`/admin/${params.storeId}/billboards`);
            toast.success("Store deleted");
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
                <Header title={`${initialData ? "Edit Product" : "Create Product"}`} description={`${initialData ? "Edit a Product" : "Add a new Product"}`} />
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
                <FormField
                    control={form.control}
                    name="images"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Images</FormLabel>
                            <FormControl>
                                <ImageUpload onChange={(data: any) => {
                                    console.log(data)
                                    field.onChange([...field.value, { url: data }])
                                }}
                                    onRemove={(url: any) => {
                                        console.log(url)
                                        field.onChange([...field.value.filter((data) => data.url !== url)])
                                    }}
                                    value={field.value.map((value) => value.url)}
                                    disabled={loading} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">

                    <div className="grid grid-cols-3 gap-8">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Product name"
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
                            name="categoryId"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Billboard</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger className="w-[180px]">
                                                <SelectValue placeholder="Select a billboard" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {category && category.map((data: any) =>
                                                <SelectItem key={data.id} value={data.id}>{data.name}</SelectItem>
                                            )}
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <Button disabled={loading} type="submit">
                        {initialData ? "Save changes" : "Create BillBoard"}
                    </Button>
                </form>
            </Form>
            <Separator />
        </>
    );
};
