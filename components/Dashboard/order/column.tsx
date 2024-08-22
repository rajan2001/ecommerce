"use client"

import { ColumnDef } from "@tanstack/react-table"


// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type OrderColumn = {
    id: string
    phone: string,
    address: string,
    paid: boolean,
    totalPrice: string,
    products: string,
    createdAt: string
}

export const columns: ColumnDef<OrderColumn>[] = [
    {
        accessorKey: "products",
        header: "Products",
    },
    {
        accessorKey: "phone",
        header: "Phone",
    },
    {
        accessorKey: "address",
        header: "Address",
    },
    {
        accessorKey: "paid",
        header: "isPaid",
    },
    {
        accessorKey: "totalPrice",
        header: "TotalPrice",
    },

    {
        accessorKey: "createdAt",
        header: "Date",
    },
]
