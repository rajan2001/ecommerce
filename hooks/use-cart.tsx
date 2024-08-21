import { IconsClassName } from '@/lib/config';
import { ProductProps } from '@/lib/randomProduct'
import { cn } from '@/lib/utils';
import { Frown, ShoppingBag } from 'lucide-react';
import toast from 'react-hot-toast'
import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware';

export const useCart = create(persist((set) => ({
    items: [],
    setItems: (data: ProductProps[]) => set({ items: data }),
    additem: (data: ProductProps) => set((state: any) => {
        let count = 0;
        const currentItem = state.items.find((item: any) => item.id === data.id)
        if (currentItem) {
            toast.error("Item already exist in Cart")
            return ({ items: [...state.items] })
        }

        toast("Item added to Cart", {
            icon: <ShoppingBag className={cn(IconsClassName)} />,
        })
        return ({ items: [...state.items, { ...data, count: count + 1 }] })
    }),
    addNumberItem: (data: ProductProps) => set((state: any) => {
        const currentItem = state.items.find((item: any) => item.id === data.id)
        if (currentItem && currentItem.count < 5) {
            const updatedItems = state.items.map((item: any) => {
                if (item.id === currentItem.id) {
                    return { ...currentItem, count: currentItem.count + 1 }
                }
                else {
                    return item
                }
            })

            return ({ items: [...updatedItems] })
        }
        else {
            toast.error("You can't add more than 5.")
            return ({ items: [...state.items] })
        }
    }),
    removeNumberItem: (data: ProductProps) => set((state: any) => {
        const currentItem = state.items.find((item: any) => item.id === data.id)
        if (currentItem && currentItem.count > 1) {
            const updatedItems = state.items.map((item: any) => {
                if (item.id === currentItem.id) {
                    return { ...currentItem, count: currentItem.count - 1 }
                }
                else {
                    return item
                }
            })

            return ({ items: [...updatedItems] })
        }

        else {
            const updatedItems = state.items.filter((item: any) => item.id !== data.id)
            toast("Item removed", {
                icon: <Frown className={cn(IconsClassName)} />,
            })
            return ({ items: [...updatedItems] })
        }
    }),

    removeItem: (id: string) => set((state: any) => {
        const currentItem = state.items.find((item: any) => item.id === id)
        if (!currentItem) {
            return toast.error("Item does not exist in Cart")
        }


        toast("Item removed from Cart", {
            icon: <Frown className={cn(IconsClassName)} />,
        })
        return ({ items: state.items.filter((item: any) => item.id !== id) })
    }),
    removeAll: () => set({ items: [] }),
}), {
    name: 'cart',
    storage: createJSONStorage(() => sessionStorage),
},))