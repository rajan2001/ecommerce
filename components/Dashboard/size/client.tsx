"use client";

import Header from "@/components/Dashboard/heading";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import React from "react";
import { Separator } from "@/components/ui/separator";
import { DataTable } from "@/components/ui/data-table";
import { ApiRoutes } from "./api-routes";
import { columns, SizeColumn } from "./column";

interface ColorClientProps {
    data: SizeColumn[]
}

export const SizeClient: React.FC<ColorClientProps> = ({ data }) => {
    const router = useRouter()
    const params = useParams()
    return (
        <>
            <div className="flex items-center justify-between">
                <Header title={`Size (${data.length})`} description="Manage size of your store" />
                <Button onClick={() => router.push(`/admin/${params.storeId}/size/new`)}>
                    <Plus className="mr-2 w-4 h-4" />
                    Add New
                </Button>
            </div>
            <Separator />
            <DataTable searchKey="name" columns={columns} data={data} />
            <ApiRoutes storeId={params.storeId} />
        </>
    );
};
