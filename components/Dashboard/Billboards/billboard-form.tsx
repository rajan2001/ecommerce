"use client";

import React, { useState } from "react";
import * as z from "zod";
import { Billboard } from "@prisma/client";
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
import { ApiAlert } from "@/components/Dashboard/api-alert";
import { useOrigin } from "@/hooks/use-origin";
import ImageUpload from "./image-upload";

interface BillBoardFormProps {
    initialData: Billboard | null | undefined;
}

const formSchema = z.object({
    label: z.string().min(2).max(50),
    imageUrl: z.string()
});
export const BillBoardForm: React.FC<BillBoardFormProps> = ({ initialData }) => {
    const params = useParams();
    const router = useRouter();
    const origin = useOrigin();
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: initialData || {
            label: '',
            imageUrl: ''
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
            router.push(`/api/store/${params.storeId}/billboards`);
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
                <Header title={`${initialData ? "Edit BillBoard" : "Create BillBoard"}`} description={`${initialData ? "Edit a BillBoard" : "Add a new BillBoard"}`} />
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
                    <FormField
                        control={form.control}
                        name="imageUrl"
                        render={({ field }) => (
                            <FormItem>

                                <FormLabel>Background Image</FormLabel>
                                <FormControl>
                                    <ImageUpload onChange={(url: any) => field.onChange(url)}
                                        onRemove={() => field.onChange("")}
                                        value={field.value ? [field.value] : []} disabled={loading} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <div className="grid grid-cols-3 gap-8">
                        <FormField
                            control={form.control}
                            name="label"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Label</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="BillBoard name"
                                            {...field}
                                            disabled={loading}
                                        />
                                    </FormControl>
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
