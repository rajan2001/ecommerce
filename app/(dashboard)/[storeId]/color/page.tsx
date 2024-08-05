import { format } from 'date-fns'
import prisma from "@/lib/prismaDb";
import { ColorColumn } from '@/components/Dashboard/color/column';
import { ColorClient } from '@/components/Dashboard/color/client';

const ColorPage = async ({ params }: { params: { storeId: string } }) => {
    const billboard = await prisma?.color.findMany({
        where: {
            storeId: params.storeId,
        },
        orderBy: {
            createdAt: "desc",
        },
    });

    const formattedCategories: ColorColumn[] = billboard.map((item) => ({
        id: item.id,
        name: item.name,
        value: item.value,
        createdAt: format(item.createdAt, "MMMM do,yyyy"),
    }));
    return (
        <div className=" flex-col">
            <div className="flex-1 space-y-4 p-8 pt-6">
                <ColorClient data={formattedCategories} />
            </div>
        </div>
    );
};

export default ColorPage;
