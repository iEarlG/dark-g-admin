
import { format } from "date-fns";

import prismadb from "@/lib/prismadb";
import { formatter } from "@/lib/utils";

import { OrderClmns } from "@/components/orders/OrderColumns";
import { OrderClient } from "@/components/orders/OrderClient";

const OrderPage = async ({
    params
}: {
    params: { storeId: string }
}) => {
    const orders = await prismadb.order.findMany({
        where: {
            storeId: params.storeId
        },
        include: {
            orderItems: {
                include: {
                    product: true
                }
            }
        },
        orderBy: {
            createdAt: "desc"
        }
    });

    const formattedOrders: OrderClmns[] = orders.map((item) => ({
        id: item.id,
        phone: item.phone,
        address: item.address,
        products: item.orderItems.map((orderItem) => orderItem.product.name).join(", "),
        totalPrice: formatter.format(item.orderItems.reduce((total, item) => {
            return total + Number(item.product.price);
        }, 0)),
        isPaid: item.isPaid,
        createdAt: format(item.createdAt, `MMMM dd, yyyy`),
    }));

    return ( 
        <div className="flex-col">
            <div className="flex-1 space-y-4 pt-6 p-8">
                <OrderClient data={formattedOrders} />
            </div>
        </div>
    );
}
 
export default OrderPage;