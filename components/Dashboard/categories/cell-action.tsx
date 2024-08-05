"use client"
import onCopy from "@/components/Copy"
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import axios from "axios"
import { CopyIcon, EditIcon, MoreHorizontal, TrashIcon } from "lucide-react"
import { useParams } from "next/navigation"
import { useRouter } from "next/navigation"
import { useState } from "react"
import toast from "react-hot-toast"
import { AlertModal } from "../alert-modal"

const CellAction = ({ data }: any) => {
    const router = useRouter()
    const params = useParams()
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);

    async function onDelete() {
        try {
            setLoading(true);
            await axios.delete(`/api/store/${params.storeId}/categories/${data.id}`);
            router.refresh();
            toast.success("Category deleted");
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
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Open menu</span>
                        <MoreHorizontal className="h-4 w-4" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuItem
                        onClick={() => onCopy(data.id, "ID Copied Successfully")}
                    >
                        <CopyIcon className="h-4 w-4 mr-2" />
                        Copy ID
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => router.push(`/admin/${params.storeId}/categories/${data.id}`)}>
                        <EditIcon className="h-4 w-4 mr-2" />
                        Update</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setOpen(true)}>
                        <TrashIcon className="h-4 w-4 mr-2" />
                        Delete</DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </>
    )
}


export default CellAction