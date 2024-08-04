import { UserButton } from "@clerk/nextjs";
import MainNavBar from "./main-nav";
import StoreSwitcher from "@/components/Dashboard/store-switcher";
import { redirect } from "next/navigation";
import prisma from "@/lib/prismaDb";
import { auth } from "@clerk/nextjs/server";

const Navbar = async () => {

    const { userId } = auth()
    if (!userId) {
        redirect('/sign-in')
    }

    const stores = await prisma.store.findMany({
        where: {
            userId
        }
    })

    return (
        <div className="border-b">
            <div className="flex items-center h-16 px-4">
                <StoreSwitcher items={stores} />

                <MainNavBar className="mx-6" />

                <div className="ml-auto flex items-center space-x-4">
                    <UserButton />
                </div>
            </div>
        </div>
    );
};

export default Navbar;
