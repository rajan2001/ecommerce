import { format } from 'date-fns'
import prisma from "@/lib/prismaDb";
import { ProductColumn } from '@/components/Dashboard/Product/column';
import { ProductClient } from '@/components/Dashboard/Product/client';
import { Formatter } from '@/lib/utils';

const ProductPage = async ({ params }: { params: { storeId: string } }) => {
    const product = await prisma?.product.findMany({
        where: {
            storeId: params.storeId,
        },
        include: {
            category: true,
            size: true,
            color: true,
        },
        orderBy: {
            createdAt: "desc",
        },
    });

    const formattedBillboards: ProductColumn[] = product.map((item) => ({
        id: item.id,
        name: item.name,
        isFeatured: item.isFeatured,
        isArchived: item.isArchived,
        price: Formatter.format(item.price.toNumber()),
        category: item.category.name,
        size: item.size.name,
        color: item.color.value,
        createdAt: format(item.createdAt, "MMMM do,yyyy"),
    }));
    return (
        <div className=" flex-col">
            <div className="flex-1 space-y-4 p-8 pt-6">
                <ProductClient data={formattedBillboards} />
            </div>
        </div>
    );
};

export default ProductPage;
