
import prismadb from "@/lib/prismadb";

import { ColorForm } from "@/components/colors/ColorForm";

const ColorPage = async ({
    params
} : {
    params: { colorId: string }
}) => {
    const colors = await prismadb.color.findUnique({
        where: {
            id: params.colorId
        }
    });

    return ( 
        <div className="flex-col">
            <div className="flex-1 space-y-4 p-8 pt-6">
                <ColorForm 
                    initialData={colors}
                />
            </div>
        </div>
    );
}
 
export default ColorPage;