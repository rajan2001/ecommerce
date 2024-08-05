import { format } from 'date-fns'
import prisma from "@/lib/prismaDb";
import { CategoriesColumn } from "@/components/Dashboard/categories/column";
import { CategoriesClient } from '@/components/Dashboard/categories/client';

const BillboardsPage = async ({ params }: { params: { storeId: string } }) => {
    const billboard = await prisma?.category.findMany({
        where: {
            storeId: params.storeId,
        },
        include: {
            billboard: true
        },
        orderBy: {
            createdAt: "desc",
        },
    });

    const formattedCategories: CategoriesColumn[] = billboard.map((item) => ({
        id: item.id,
        name: item.name,
        billboard: item.billboard.label,
        createdAt: format(item.createdAt, "MMMM do,yyyy"),
    }));
    return (
        <div className=" flex-col">
            <div className="flex-1 space-y-4 p-8 pt-6">
                <CategoriesClient data={formattedCategories} />
            </div>
        </div>
    );
};

export default BillboardsPage;
