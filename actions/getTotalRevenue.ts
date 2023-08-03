
import prismadb from "@/lib/prismadb";

export const getTotalRevenue = async (storeId: string) => {
    const paidOrders = await prismadb.order.findMany({
        where: {
            storeId,
            isPaid: true
        },
        include: {
            orderItems: {
                include: {
                    product: true
                }
            }
        }
    });

    const totalRevenue = paidOrders.reduce((total, order) => {
        const orderTotal = order.orderItems.reduce((orderSum, item) => {
            return orderSum + item.product.price.toNumber();
        }, 0);
        
        return total + orderTotal;
    }, 0);

    return totalRevenue;
};

interface GraphData {
    name: string;
    total: number;
};

export const getGraphRevenueData = async (storeId: string) => {
    const paidOrders = await prismadb.order.findMany({
        where: {
            storeId,
            isPaid: true
        },
        include: {
            orderItems: {
                include: {
                    product: true
                }
            }
        }
    });

    const monthlyRevenue: { [key: number]: number } = {};

    for (const order of paidOrders) {
        const month = order.createdAt.getMonth();
        let revenueForOrder = 0;

        for (const item of order.orderItems) {
            revenueForOrder += item.product.price.toNumber();
        }

        monthlyRevenue[month] = (monthlyRevenue[month] || 0) + revenueForOrder;
    };

    const graphData: GraphData[] = [
        { name: "January", total: 0 },
        { name: "February", total: 0 },
        { name: "March", total: 0 },
        { name: "April", total: 0 },
        { name: "May", total: 0 },
        { name: "June", total: 0 },
        { name: "July", total: 0 },
        { name: "August", total: 0 },
        { name: "September", total: 0 },
        { name: "October", total: 0 },
        { name: "November", total: 0 },
        { name: "December", total: 0 },
    ];

    for (const month in monthlyRevenue) {
        graphData[parseInt(month)].total = monthlyRevenue[parseInt(month)];
    }

    return graphData;
};