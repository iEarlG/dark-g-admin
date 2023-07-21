
import { format } from "date-fns";

import prismadb from "@/lib/prismadb";

import { ColorsClient } from "@/components/colors/ColorsClient";
import { ColorsClmns } from "@/components/colors/ColorsColumns";

const ColorsPage = async ({
    params
}: {
    params: { storeId: string }
}) => {
    const colors = await prismadb.color.findMany({
        where: {
            storeId: params.storeId
        },
        orderBy: {
            createdAt: "desc"
        }
    });

    const formattedColors: ColorsClmns[] = colors.map((item) => ({
        id: item.id,
        name: item.name,
        value: item.value,
        createdAt: format(item.createdAt, `MMMM dd, yyyy`),
    }));

    return ( 
        <div className="flex-col">
            <div className="flex-1 space-y-4 pt-6 p-8">
                <ColorsClient data={formattedColors} />
            </div>
        </div>
    );
}
 
export default ColorsPage;