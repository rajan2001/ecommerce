import { CategoriesForm } from "@/components/Dashboard/categories/category-form"

const Page = async ({ params }: { params: { categoriesId: string, storeId: string } }) => {

    const category = await prisma?.category.findUnique({
        where: {
            id: params?.categoriesId,
        }
    })

    const billboard = await prisma?.billboard.findMany({
        where: {
            storeId: params.storeId
        }
    })

    return <div className="flex flex-col">
        <div className="flex-1 space-y-4 p-8 pt-6">
            <CategoriesForm initialData={category} billboardData={billboard} />
        </div>
    </div>
}

export default Page