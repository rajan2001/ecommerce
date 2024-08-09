"use client";

import React, { useState } from "react";
import * as z from "zod";
import { Billboard, Category, Color, Image, Product, Size } from "@prisma/client";
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
    FormDescription,
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
import { Checkbox } from "@/components/ui/checkbox"

interface BillBoardFormProps {
    initialData: Product & {
        images: Image[]
    } | null | undefined;
    category: Category[] | null | undefined;
    size: Size[] | null | undefined;
    color: Color[] | null | undefined;
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
export const ProductForm: React.FC<BillBoardFormProps> = ({ initialData, category, size, color }) => {
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
                await axios.patch(`/api/store/${params.storeId}/product/${params.productId}`, values);
            }
            else {
                await axios.post(`/api/store/${params.storeId}/product`, values);
            }
            router.refresh();
            toast.success(`${initialData ? "Product updated Succesfully" : "Product Created"}`);
        } catch (error) {
            toast.error("Something went wrong");
        } finally {
            setLoading(false);
        }
    }

    async function onDelete() {
        try {
            setLoading(true);
            await axios.delete(`/api/store/${params.storeId}/product/${params.productId}`);
            router.refresh();
            router.push(`/admin/${params.storeId}/product`);
            toast.success("Product deleted");
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
                                <ImageUpload onChange={(url: any) => field.onChange([...field.value, { url }])}
                                    onRemove={(url: any) => field.onChange([...field.value.filter((current) => current.url !== url)])}
                                    value={field.value.map((image) => image.url)}
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
                            name="price"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Price</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="9.99"
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
                                    <FormLabel>Category</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select a Category" />
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
                        <FormField
                            control={form.control}
                            name="sizeId"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Size</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select a Size" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {size && size.map((data: any) =>
                                                <SelectItem key={data.id} value={data.id}>{data.name}</SelectItem>
                                            )}
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="colorId"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Color</FormLabel>
                                    <div className="flex gap-4 items-center">
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select a color" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {color && color.map((data: any) =>
                                                    <SelectItem key={data.id} value={data.id}>{data.name}</SelectItem>
                                                )}
                                            </SelectContent>
                                        </Select>
                                        <div style={{ backgroundColor: field.value }} className={`rounded-full p-4`}></div>
                                    </div>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="isFeatured"
                            render={({ field }) => (
                                <FormItem className=" flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">

                                    <FormControl>
                                        <Checkbox checked={field.value}
                                            onCheckedChange={field.onChange}
                                        />
                                    </FormControl>
                                    <div className="space-y-1 leading-none">
                                        <FormLabel>Featured</FormLabel>
                                        <FormDescription>This product will apper on the home page</FormDescription>
                                    </div>
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="isArchived"
                            render={({ field }) => (
                                <FormItem className=" flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">

                                    <FormControl>
                                        <Checkbox checked={field.value}
                                            onCheckedChange={field.onChange}
                                        />
                                    </FormControl>
                                    <div className="space-y-1 leading-none">
                                        <FormLabel>Archived</FormLabel>
                                        <FormDescription>This product will hidden on the home page</FormDescription>
                                    </div>
                                </FormItem>
                            )}
                        />
                    </div>
                    <Button disabled={loading} type="submit">
                        {initialData ? "Save changes" : "Create Product"}
                    </Button>
                </form>
            </Form>
            <Separator />
        </>
    );
};
