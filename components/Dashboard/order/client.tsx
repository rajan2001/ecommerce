"use client";

import Header from "@/components/Dashboard/heading";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import React from "react";
import { Separator } from "@/components/ui/separator";
import { DataTable } from "@/components/ui/data-table";
import { ApiRoutes } from "./api-routes";
import { columns, OrderColumn } from "./column";

interface ColorClientProps {
    data: OrderColumn[]
}

export const OrderClient: React.FC<ColorClientProps> = ({ data }) => {
    const router = useRouter()
    const params = useParams()
    return (
        <>
            <Header title={`Order (${data.length})`} description="Manage Order of your store" />
            <Separator />
            <DataTable searchKey="name" columns={columns} data={data} />
            <ApiRoutes storeId={params.storeId} />
        </>
    );
};
