"use client";

import Header from "@/components/Dashboard/heading";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import React from "react";
import { BillboradColumn, columns } from "@/components/Dashboard/Billboards/column";
import { Separator } from "@/components/ui/separator";
import { DataTable } from "@/components/ui/data-table";
import { ApiAlert } from "../api-alert";
import { ApiRoutes } from "./api-routes";

interface BillboardClientProps {
    data: BillboradColumn[]
}

export const BillBoardsClient: React.FC<BillboardClientProps> = ({ data }) => {
    const router = useRouter()
    const params = useParams()
    return (
        <>
            <div className="flex items-center justify-between">
                <Header title={`Billboards (${data.length})`} description="Manage billboard of your store" />
                <Button onClick={() => router.push(`/admin/${params.storeId}/billboards/new`)}>
                    <Plus className="mr-2 w-4 h-4" />
                    Add New
                </Button>
            </div>
            <Separator />
            <DataTable searchKey="label" columns={columns} data={data} />
            <ApiRoutes storeId={params.storeId} />
        </>
    );
};
