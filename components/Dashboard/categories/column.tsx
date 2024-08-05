"use client"

import { ColumnDef } from "@tanstack/react-table"
import CellAction from "@/components/Dashboard/categories/cell-action"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type CategoriesColumn = {
    id: string
    name: string,
    billboard: string,
    createdAt: string
}

export const columns: ColumnDef<CategoriesColumn>[] = [
    {
        accessorKey: "name",
        header: "Name",
    },
    {
        accessorKey: "billboard",
        header: "BillBoard",
    },
    {
        accessorKey: "createdAt",
        header: "Date",
    },
    {
        id: "actions",
        cell: ({ row }) => {

            return <CellAction data={row.original} />
        },
    }
]
