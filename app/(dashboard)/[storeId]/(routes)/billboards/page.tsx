
import { BillboardClient } from "@/components/BillboardClient";

const BillboardPage = () => {
    return ( 
        <div className="flex-col">
            <div className="flex-1 space-y-4 pt-6 p-8">
                <BillboardClient />
            </div>
        </div>
    );
}
 
export default BillboardPage;