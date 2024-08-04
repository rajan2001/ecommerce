"use client"
import { useState } from "react"
import { Store } from "@prisma/client"
import { Check, ChevronsUpDown, PlusCircle, Store as StoreIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    CommandSeparator,
} from "@/components/ui/command"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { useStoreModal } from "@/hooks/use-store-model"
import { useParams } from "next/navigation"
import { useRouter } from "next/navigation"


type PopoverTriggerProps = React.ComponentPropsWithoutRef<typeof PopoverTrigger>

interface StoreSwitcherProps extends PopoverTriggerProps {
    items: Store[]
}


const StoreSwitcher = ({ items = [], className }: StoreSwitcherProps) => {
    const onOpen = useStoreModal((state) => state.onOpen)
    const params = useParams()
    const router = useRouter()


    const formattedItems = items.map((item) => ({
        value: item.id,
        label: item.name
    }))

    const currentStore = formattedItems.find((item) => (item.value) === params.storeId)


    const [open, setOpen] = useState(false)

    const onStoreSelect = (store: { value: string, label: string }) => {
        setOpen(false)
        router.push(`/${store.value}`)
    }
    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    size="sm"
                    aria-expanded={open}
                    className="w-[200px] justify-between"
                >
                    <StoreIcon className="mr-2 h-4 w-4" />
                    {currentStore?.label}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className={cn("w-[200px] p-0", className)}>
                <Command>

                    <CommandList>
                        <CommandGroup heading="Store">

                            {formattedItems.map((formattedItem) => (
                                <CommandGroup key={formattedItem.value}
                                    value={formattedItem.value}
                                    onClick={() => onStoreSelect(formattedItem)}
                                    className=" cursor-pointer "
                                >

                                    <CommandItem

                                    >

                                        <StoreIcon className="mr-2 h-4 w-4" />

                                        {formattedItem.label}
                                        <Check
                                            className={cn(
                                                "ml-auto h-4 w-4",
                                                currentStore?.value === formattedItem?.value ? "opacity-100" : "opacity-0"
                                            )}
                                        />
                                    </CommandItem>
                                </CommandGroup>
                            ))}
                        </CommandGroup>
                    </CommandList>
                    <CommandSeparator />
                    <CommandList>
                        <CommandGroup onClick={() => {
                            setOpen(false)
                            onOpen()
                        }}
                            className=" cursor-pointer"

                        >

                            <CommandItem

                            >
                                <PlusCircle className="mr-2 h-5 w-5" />
                                Create Store
                            </CommandItem>
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    )
}

export default StoreSwitcher