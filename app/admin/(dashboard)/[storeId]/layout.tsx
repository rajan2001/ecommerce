
import Navbar from '@/components/Dashboard/navbar';
import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation'


export default async function DashBoardLayout({
    children, params
}: {
    children: React.ReactNode,
    params: { storeId: string }
}) {

    const { userId } = auth();

    if (!userId) {
        redirect("/admin/sign-in")
    }


    const store = await prisma?.store.findFirst({
        where: {
            id: params?.storeId,
            userId: userId
        }
    })

    if (!store) {
        redirect("/admin")
    }


    return (
        <>
            <Navbar />
            {children}

        </>
    )
}