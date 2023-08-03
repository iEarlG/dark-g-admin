
import prismadb from "@/lib/prismadb";

export const getMonthlyPercentage = async (storeId: string) => {
    const salesCount = await prismadb.order.count({
        where: {
            storeId,
            isPaid: true
        },
    });

    return salesCount;
};