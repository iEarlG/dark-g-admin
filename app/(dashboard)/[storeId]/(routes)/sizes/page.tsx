
import { format } from "date-fns";

import prismadb from "@/lib/prismadb";

import { SizesClient } from "@/components/sizes/SizesClient";
import { SizeClmns } from "@/components/sizes/SizesColumns";

const SizesPage = async ({
    params
}: {
    params: { storeId: string }
}) => {
    const sizes = await prismadb.size.findMany({
        where: {
            storeId: params.storeId
        },
        orderBy: {
            createdAt: "desc"
        }
    });

    const formattedSizes: SizeClmns[] = sizes.map((item) => ({
        id: item.id,
        name: item.name,
        value: item.value,
        createdAt: format(item.createdAt, `MMMM dd, yyyy`),
    }));

    return ( 
        <div className="flex-col">
            <div className="flex-1 space-y-4 pt-6 p-8">
                <SizesClient data={formattedSizes} />
            </div>
        </div>
    );
}
 
export default SizesPage;