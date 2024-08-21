
import Link from "next/link"
import { getCatergory } from "@/actions/get-category-actions"
import MainNavBarStore from "./main-nav-store"
import { ShoppingBasket } from "lucide-react"
import ShoppingBag from "./ShoppingBag"

export const NavBar = async () => {
    const data = await getCatergory()
    return <div className="fixed top-0 left-0 w-screen bg-white px-12 z-50">
        <div className="lg:flex hidden items-center h-16 justify-between">
            <Link className="text-xl font-bold cursor-pointer flex items-center gap-x-2" href={"/"}>
                <ShoppingBasket className="h-8 w-8" /> Alamode
            </Link>
            <MainNavBarStore data={data} />
            <ShoppingBag />
        </div>
    </div>
}