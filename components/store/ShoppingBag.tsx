"use client"
import { ShoppingBagIcon } from "lucide-react"
import { Button } from "../ui/button"
import { IconsClassName } from "@/lib/config"
import { cn } from "@/lib/utils"
import { useCart } from "@/hooks/use-cart"

const ShoppingBag = () => {
    const cart: any = useCart()
    return <Button className="flex gap-2 items-center" >
        <ShoppingBagIcon className={cn(IconsClassName)} /> <span>{cart.items.length}</span></Button>

}


export default ShoppingBag