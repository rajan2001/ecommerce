import { ShoppingBagIcon } from "lucide-react"
import { Button } from "../ui/button"

export const NavBar = () => {
    return <div className="flex items-center justify-between py-3">
        <h1 className=" font-bold">Store</h1>
        <Button className="py-2 px-4 rounded-full">
            <ShoppingBagIcon className="h-4 w-4 mr-2" />
            <div>0</div>
        </Button>
    </div>
}