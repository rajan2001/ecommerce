import { BillBoardForm } from "@/components/Dashboard/Billboards/billboard-form"

const Page = async ({ params }: { params: { billboardId: string } }) => {

    const billboard = await prisma?.billboard.findUnique({
        where: {
            id: params?.billboardId,
        }
    })
    return <div className="flex flex-col">
        <div className="flex-1 space-y-4 p-8 pt-6">
            <BillBoardForm initialData={billboard} />
        </div>
    </div>
}

export default Page