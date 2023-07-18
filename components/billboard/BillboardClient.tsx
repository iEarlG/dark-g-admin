"use client";

import { useParams, useRouter } from "next/navigation";

import { Plus } from "lucide-react";

import { BillboardClmns, columns } from "@/components/billboard/BillboardColumns";

import { Heading } from "@/components/ui/Heading";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { DataTable } from "@/components/ui/data-table";
import { ApiRoutes } from "@/components/ApiRoutes";

interface BillboardClientProps {
    data: BillboardClmns[];
}

export const BillboardClient: React.FC<BillboardClientProps> = ({
    data
}) => {
    const router = useRouter();
    const params = useParams();

    return (
        <>
            <div className="flex items-center justify-between">
                <Heading 
                    title={`Billboards (${data.length})`}
                    description="Billboards are a great way to advertise your store."
                />
                <Button onClick={() => router.push(`/${params.storeId}/billboards/new`)}>
                    <Plus className="h-4 w-4 mr-2" />
                    Add new
                </Button>
            </div>
            <Separator />
            <DataTable columns={columns} data={data} searchKey="label" />
            <Heading title="API's" description="API billboard calls" />
            <Separator />
            <ApiRoutes entityName="billboards" entityIdName="billboardId" />
        </>
    )
}