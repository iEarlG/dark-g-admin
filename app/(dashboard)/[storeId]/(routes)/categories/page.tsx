
import { format } from "date-fns";

import prismadb from "@/lib/prismadb";

import { CategoryClient } from "@/components/categories/CategoryClient";
import { CategoryClmns } from "@/components/categories/CategoryColumns";

const CategoriesPage = async ({
    params
}: {
    params: { storeId: string }
}) => {
    const categories = await prismadb.category.findMany({
        where: {
            storeId: params.storeId
        },
        include: {
            billboard: true
        },
        orderBy: {
            createdAt: "desc"
        }
    });

    const formattedCategories: CategoryClmns[] = categories.map((item) => ({
        id: item.id,
        name: item.name,
        billboardLabel: item.billboard.label,
        createdAt: format(item.createdAt, "MMMM dd, yyyy")
    }));

    return ( 
        <div className="flex-col">
            <div className="flex-1 space-y-4 pt-6 p-8">
                <CategoryClient data={formattedCategories} />
            </div>
        </div>
    );
}
 
export default CategoriesPage;