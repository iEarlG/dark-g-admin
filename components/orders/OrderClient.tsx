"use client";

import { OrderClmns, columns } from "@/components/orders/OrderColumns";

import { Heading } from "@/components/ui/Heading";
import { Separator } from "@/components/ui/separator";
import { DataTable } from "@/components/ui/data-table";

interface OrderClientProps {
    data: OrderClmns[];
}

export const OrderClient: React.FC<OrderClientProps> = ({
    data
}) => {
    return (
        <>
            <Heading 
                title={`Orders (${data.length})`}
                description="Order list of the store with all the details."
            />
            <Separator />
            <DataTable columns={columns} data={data} searchKey="products" />
        </>
    )
}