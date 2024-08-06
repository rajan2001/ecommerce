import { SizeForm } from "@/components/Dashboard/size/size-form"

const Page = async ({ params }: { params: { sizeId: string, storeId: string } }) => {

    const size = await prisma?.size.findUnique({
        where: {
            id: params?.sizeId,
        }
    })

    return <div className="flex flex-col">
        <div className="flex-1 space-y-4 p-8 pt-6">
            <SizeForm initialData={size} />
        </div>
    </div>
}

export default Page