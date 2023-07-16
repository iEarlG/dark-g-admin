"use client";

import { useParams } from "next/navigation";

import { useOrigin } from "@/hooks/useOrigin";
import { ApiAlert } from "@/components/ApiAlert";

interface ApiRoutesProps {
    entityName: string;
    entityIdName: string;
}

export const ApiRoutes: React.FC<ApiRoutesProps> = ({
    entityName,
    entityIdName
}) => {
    const params = useParams();
    const origin = useOrigin();

    const baseUrl = `${origin}/api/${params.storeId}`;
    return (
        <>
            <ApiAlert 
                title="GET" 
                description={`${baseUrl}/${entityName}`}
                variant="public" 
            />
            <ApiAlert 
                title="POST" 
                description={`${baseUrl}/${entityName}`}
                variant="admin" 
            />
            <ApiAlert 
                title="GET" 
                description={`${baseUrl}/${entityName}/{${entityIdName}}`}
                variant="public" 
            />
            <ApiAlert 
                title="PATCH" 
                description={`${baseUrl}/${entityName}/{${entityIdName}}`}
                variant="admin" 
            />
            <ApiAlert 
                title="DELETE" 
                description={`${baseUrl}/${entityName}/{${entityIdName}}`}
                variant="admin" 
            />
        </>
    );
}