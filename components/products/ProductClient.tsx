"use client";

import { useParams, useRouter } from "next/navigation";

import { Plus } from "lucide-react";

import { ProductClmns, columns } from "@/components/products/ProductColumns";

import { Heading } from "@/components/ui/Heading";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { DataTable } from "@/components/ui/data-table";
import { ApiRoutes } from "@/components/ApiRoutes";

interface ProductClientProps {
    data: ProductClmns[];
}

export const ProductClient: React.FC<ProductClientProps> = ({
    data
}) => {
    const router = useRouter();
    const params = useParams();

    return (
        <>
            <div className="flex items-center justify-between">
                <Heading 
                    title={`Products (${data.length})`}
                    description="Products are the items that you sell in your store."
                />
                <Button onClick={() => router.push(`/${params.storeId}/products/new`)}>
                    <Plus className="h-4 w-4 mr-2" />
                    Add new
                </Button>
            </div>
            <Separator />
            <DataTable columns={columns} data={data} searchKey="name" />
            <Heading title="API's" description="API products calls" />
            <Separator />
            <ApiRoutes entityName="products" entityIdName="products" />
        </>
    )
}