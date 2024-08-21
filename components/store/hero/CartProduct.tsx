"use client"
import { CldImage } from "next-cloudinary"
import { Currency } from "../currancy"
import { cn } from "@/lib/utils"
import { IconsClassName } from "@/lib/config"
import { Badge } from "@/components/ui/badge"
import { Minus, Plus, X } from "lucide-react"
import { useCart } from "@/hooks/use-cart"


export const CartProduct = ({ item }: any) => {
    const cart: any = useCart()

    return <div className=" shadow-md p-4 rounded-lg flex gap-x-6">
        <div className="relative h-24 w-24 rounded-md overflow-hidden sm:h-48 sm:w-48">
            <CldImage
                alt='Product'
                width="600"
                height="600"
                className='object-cover w-full h-full'
                src={item.images} />
        </div>
        <div className="flex flex-col gap-2">
            <p className='font-semibold text-lg'>{item.name}</p>
            <p className='text-sm text-gray-500'>{item.categroy}</p>
            <div>
                <Currency value={item.price} currency={item.currency} />
            </div>
            <div className='flex items-end gap-x-2 flex-1'>
                <Badge className=" cursor-pointer" onClick={() => cart.removeNumberItem(item)}><Minus className={cn(IconsClassName)} /></Badge><span>{item.count}</span><Badge className=" cursor-pointer" onClick={() => cart.addNumberItem(item)}><Plus className={cn(IconsClassName)} /></Badge>
            </div>
        </div>
        <div className="mr-auto flex-1 flex justify-end ">
            <X className={cn(IconsClassName, "text-black cursor-pointer")} onClick={() => (cart.removeItem(item.id))} />
        </div>
    </div>
}
