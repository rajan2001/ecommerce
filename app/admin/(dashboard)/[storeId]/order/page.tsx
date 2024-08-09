import { format } from 'date-fns'
import prisma from "@/lib/prismaDb";
import { OrderClient } from '@/components/Dashboard/order/client';
import { Formatter } from '@/lib/utils';
import { OrderColumn } from '@/components/Dashboard/order/column';

const OrderPage = async ({ params }: { params: { storeId: string } }) => {
    const order = await prisma?.order.findMany({
        where: {
            storeId: params.storeId,
        },
        include: {
            order: {
                include: {
                    product: true
                }
            }
        },
        orderBy: {
            createdAt: "desc",
        },
    });

    const formattedCategories: OrderColumn[] = order.map((item) => ({
        id: item.id,
        phone: item.phone,
        paid: item.isPaid,
        address: item.address,
        products: item.order.map((orderItem) => orderItem.product.name).join(','),
        totalPrice: Formatter.format(item.order.reduce((total, items) => {
            return total + Number(items.product.price)
        }, 0)),
        createdAt: format(item.createdAt, "MMMM do,yyyy"),
    }));
    return (
        <div className=" flex-col">
            <div className="flex-1 space-y-4 p-8 pt-6">
                <OrderClient data={formattedCategories} />
            </div>
        </div>
    );
};

export default OrderPage;
