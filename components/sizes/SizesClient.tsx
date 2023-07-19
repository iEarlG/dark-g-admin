"use client";

import { useParams, useRouter } from "next/navigation";

import { Plus } from "lucide-react";

import { SizeClmns, columns } from "@/components/sizes/SizesColumns";

import { Heading } from "@/components/ui/Heading";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { DataTable } from "@/components/ui/data-table";
import { ApiRoutes } from "@/components/ApiRoutes";

interface SizesClientProps {
    data: SizeClmns[];
}

export const SizesClient: React.FC<SizesClientProps> = ({
    data
}) => {
    const router = useRouter();
    const params = useParams();

    return (
        <>
            <div className="flex items-center justify-between">
                <Heading 
                    title={`Sizes (${data.length})`}
                    description="Sizes are used to define the size of the products."
                />
                <Button onClick={() => router.push(`/${params.storeId}/sizes/new`)}>
                    <Plus className="h-4 w-4 mr-2" />
                    Add new
                </Button>
            </div>
            <Separator />
            <DataTable columns={columns} data={data} searchKey="name" />
            <Heading title="API's" description="API sizes calls" />
            <Separator />
            <ApiRoutes entityName="sizes" entityIdName="sizeId" />
        </>
    )
}