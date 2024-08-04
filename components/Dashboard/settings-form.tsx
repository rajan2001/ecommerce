"use client";

import React, { useState } from "react";
import * as z from "zod";
import { Store } from "@prisma/client";
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

interface SettingsFormProps {
    initialData: Store;
}

const formSchema = z.object({
    name: z.string().min(2).max(50),
});
export const SettingsForm: React.FC<SettingsFormProps> = ({ initialData }) => {
    const params = useParams();
    const router = useRouter();
    const origin = useOrigin();
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: initialData,
    });

    async function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            setLoading(true);
            await axios.patch(`/api/store/${params.storeId}`, values);
            router.refresh();
            toast.success("Store updated");
        } catch (error) {
            toast.error("Something went wrong");
        } finally {
            setLoading(false);
        }
    }

    async function onDelete() {
        try {
            setLoading(true);
            await axios.delete(`/api/store/${params.storeId}`);
            router.refresh();
            router.push("/");
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
                <Header title="Settings" description="Manage store preference" />
                <Button
                    variant="destructive"
                    onClick={() => {
                        setOpen(true);
                    }}
                    size="icon"
                    disabled={loading}>
                    <Trash className="w-4 h-4" />
                </Button>
            </div>
            <Separator />
            <Form {...form}>
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
                                            placeholder="Store name"
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
                        Save changes
                    </Button>
                </form>
            </Form>
            <Separator />
            <ApiAlert
                title="NEXT_PUBLIC_API_URL"
                description={`${origin}/api/${params.storeId}`}
                varient="public"
            />
        </>
    );
};
