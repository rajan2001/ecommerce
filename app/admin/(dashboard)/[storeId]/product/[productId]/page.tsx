import { ProductForm } from "@/components/Dashboard/Product/product-form"

const Page = async ({ params }: { params: { productId: string, storeId: string } }) => {

    const product = await prisma?.product.findUnique({
        where: {
            id: params?.productId,
        },
        include: {
            images: true
        }
    })

    const category = await prisma?.category.findMany({
        where: {
            storeId: params.storeId
        }
    })

    const color = await prisma?.color.findMany({
        where: {
            storeId: params.storeId
        }
    })

    const size = await prisma?.size.findMany({
        where: {
            storeId: params.storeId
        }
    })


    return <div className="flex flex-col">
        <div className="flex-1 space-y-4 p-8 pt-6">
            <ProductForm initialData={product}
                category={category}
                color={color}
                size={size} />
        </div>
    </div>
}

export default Page