"use client";

import { useParams, useRouter } from "next/navigation";

import { Plus } from "lucide-react";

import { ColorsClmns, columns } from "@/components/colors/ColorsColumns";

import { Heading } from "@/components/ui/Heading";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { DataTable } from "@/components/ui/data-table";
import { ApiRoutes } from "@/components/ApiRoutes";

interface ColorsClientProps {
    data:ColorsClmns[];
}

export const ColorsClient: React.FC<ColorsClientProps> = ({
    data
}) => {
    const router = useRouter();
    const params = useParams();

    return (
        <>
            <div className="flex items-center justify-between">
                <Heading 
                    title={`Colors (${data.length})`}
                    description="Colors available in your store to use in your products."
                />
                <Button onClick={() => router.push(`/${params.storeId}/colors/new`)}>
                    <Plus className="h-4 w-4 mr-2" />
                    Add new
                </Button>
            </div>
            <Separator />
            <DataTable columns={columns} data={data} searchKey="name" />
            <Heading title="API's" description="API colors calls" />
            <Separator />
            <ApiRoutes entityName="colors" entityIdName="colorId" />
        </>
    )
}