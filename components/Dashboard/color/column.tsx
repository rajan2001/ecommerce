"use client"

import { ColumnDef } from "@tanstack/react-table"
import CellAction from "./cell-action"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type ColorColumn = {
    id: string
    name: string,
    value: string,
    createdAt: string
}

export const columns: ColumnDef<ColorColumn>[] = [
    {
        accessorKey: "name",
        header: "Name",
    },
    {
        accessorKey: "value",
        header: "Value",
        cell: ({ row }) => {
            return <div className="flex items-center gap-x-4">
                {row.original.value}
                <div style={{ backgroundColor: row.original.value }} className="h-8 w-8 rounded-full"></div>
            </div>
        }
    },
    ,
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
