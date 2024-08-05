"use client"

import { useStoreModal } from "@/hooks/use-store-model"
import { useEffect } from "react"

const Page = () => {
    const isOpen = useStoreModal((state) => state.isOpen)
    const onOpen = useStoreModal((state) => state.onOpen)

    useEffect(() => {
        if (!isOpen) {
            onOpen()
        }
    }, [isOpen, onOpen])

    return null
}


export default Page