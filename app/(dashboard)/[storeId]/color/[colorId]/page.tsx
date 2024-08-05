import { ColorForm } from "@/components/Dashboard/color/color-form"

const Page = async ({ params }: { params: { colorId: string, storeId: string } }) => {

    const color = await prisma?.color.findUnique({
        where: {
            id: params?.colorId,
        }
    })

    return <div className="flex flex-col">
        <div className="flex-1 space-y-4 p-8 pt-6">
            <ColorForm initialData={color} />
        </div>
    </div>
}

export default Page