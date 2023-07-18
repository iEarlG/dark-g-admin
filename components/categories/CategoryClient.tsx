"use client";

import { useParams, useRouter } from "next/navigation";

import { Plus } from "lucide-react";

import { CategoryClmns, columns } from "@/components/categories/CategoryColumns";

import { Heading } from "@/components/ui/Heading";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { DataTable } from "@/components/ui/data-table";
import { ApiRoutes } from "@/components/ApiRoutes";

interface CategoryClientProps {
    data: CategoryClmns[];
}

export const CategoryClient: React.FC<CategoryClientProps> = ({
    data
}) => {
    const router = useRouter();
    const params = useParams();

    return (
        <>
            <div className="flex items-center justify-between">
                <Heading 
                    title={`Categories (${data.length})`}
                    description="Categories are used to group products in your store."
                />
                <Button onClick={() => router.push(`/${params.storeId}/categories/new`)}>
                    <Plus className="h-4 w-4 mr-2" />
                    Add new
                </Button>
            </div>
            <Separator />
            <DataTable columns={columns} data={data} searchKey="name" />
            <Heading title="API's" description="API categories calls" />
            <Separator />
            <ApiRoutes entityName="categories" entityIdName="categories" />
        </>
    )
}