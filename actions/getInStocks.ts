
import prismadb from "@/lib/prismadb";

export const getInStocks = async (storeId: string) => {
    const InStocks = await prismadb.product.count({
        where: {
            storeId,
            isArchived: false,
        },
    });

    return InStocks;
};