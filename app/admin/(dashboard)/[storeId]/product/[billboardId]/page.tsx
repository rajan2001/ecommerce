import { ProductForm } from "@/components/Dashboard/Product/product-form"

const Page = async ({ params }: { params: { billboardId: string, storeId: string } }) => {

    const product = await prisma?.product.findUnique({
        where: {
            id: params?.billboardId,
        },
        include: {
            imageUrl: true
        }
    })

    const category = await prisma?.category.findMany({
        where: {
            storeId: params.storeId
        }
    })


    return <div className="flex flex-col">
        <div className="flex-1 space-y-4 p-8 pt-6">
            <ProductForm initialData={product}
                category={category} />
        </div>
    </div>
}

export default Page