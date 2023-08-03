
import { CreditCard, DollarSign, Package } from "lucide-react";
import { formatter } from "@/lib/utils";

import { getInStocks } from "@/actions/getInStocks";
import { getTotalRevenue } from "@/actions/getTotalRevenue";
import { getMonthlyPercentage } from "@/actions/getMonthlyPercentage";

import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Heading } from "@/components/ui/Heading";

import { Overview } from "@/components/Overview";

interface DashboardPageProps {
    params: { storeId: string }
}

const DashboardPage: React.FC<DashboardPageProps> = async ({ params }) => {
    const totalRevenue = await getTotalRevenue(params.storeId); 
    const monthlyPercentage = await getMonthlyPercentage(params.storeId);
    const inStock = await getInStocks(params.storeId);

    return (
        <div className="flex-col">
            <div className="flex-1 space-y-4 p-8 pt-6">
                <Heading 
                    title="Dashboard"
                    description="Overview of your store's performance."
                />
                <Separator />
                <div className="grid grid-cols-3 gap-4">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium uppercase">
                                Total Revenue
                            </CardTitle>
                            <DollarSign className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <span className="text-2xl font-bold">
                                {formatter.format(totalRevenue)}
                            </span>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium uppercase">
                                Monthly Percentage
                            </CardTitle>
                            <CreditCard className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <span className="text-2xl font-bold">
                                {monthlyPercentage}%
                            </span>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium uppercase">
                                Available Products
                            </CardTitle>
                            <Package className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <span className="text-2xl font-bold">
                                {inStock}
                            </span>
                        </CardContent>
                    </Card>
                </div>
                <Card className="col-span-4">
                    <CardHeader>
                        <CardTitle>Overview</CardTitle>
                    </CardHeader>
                    <CardContent className="pl-2">
                        <Overview data={[]} />
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
 
export default DashboardPage;