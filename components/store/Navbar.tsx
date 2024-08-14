import { ShoppingBagIcon } from "lucide-react"
import { Button } from "../ui/button"
import Link from "next/link"
import MainNavBarStore from "./main-nav-store"
import { getCatergory } from "@/actions/get-category-actions"

export const NavBar = async () => {
    const data = await getCatergory()
    return <div className="flex items-center justify-between px-4 md:px-6 lg:px-8 h-16">
        <Link href={"/"}>
            <h1 className=" font-bold text-xl">Store</h1>
        </Link>
        <MainNavBarStore data={data} />
        <Button className="py-2 px-4 rounded-full">
            <ShoppingBagIcon className="h-4 w-4 mr-2" />
            <div>0</div>
        </Button>
    </div>
}