import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import prisma from "@/lib/prismaDb";

export default async function SetupLayout({
    children,
}: {
    children: React.ReactNode
}) {

    const { userId } = auth();

    if (!userId) {
        redirect("/sign-in")
    }


    const store = await prisma?.store.findFirst({
        where: {
            userId
        }
    })

    if (store) {
        redirect(`/${store.id}`)
    }



    return (
        <>
            {children}
        </>
    )
}