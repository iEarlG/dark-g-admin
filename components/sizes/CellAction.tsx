"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";

import { Copy, Edit, MoreHorizontal, Trash } from "lucide-react";

import { BillboardClmns } from "@/components/billboard/BillboardColumns";
import { AlertModal } from "@/components/modals/AlertModal";

import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

interface CellActionProps {
    data: BillboardClmns;
}

export const CellAction: React.FC<CellActionProps> = ({
    data,
}) => {
    const router = useRouter();
    const params = useParams();

    const [isLoading, setIsLoading] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    const onCopy = (id: string) => {
        navigator.clipboard.writeText(id);
        toast.success("ID Copied to clipboard.");
    };

    const onDelete = async () => {
        try {
            setIsLoading(true);

            await axios.delete(`/api/${params.storeId}/billboards/${data.id}`);
            router.refresh();
            toast.success("Billboard deleted successfully.");
        } catch (error) {
            toast.error("Make sure you have no categories in your store inside this billboard.");
        } finally {
            setIsLoading(false);
            setIsOpen(false);
        }
    }
    return (
        <>
        <AlertModal 
            isOpen={isOpen}
            onClose={() => setIsOpen(false)}
            onConfirm={onDelete}
            isLoading={isLoading}
        />
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button className="h-8 w-8 p-0" variant="ghost">
                        <span className="sr-only">Open Menu</span>
                        <MoreHorizontal className="h-4 w-4" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuItem onClick={() => router.push(`/${params.storeId}/billboards/${data.id}`)}>
                        <Edit className="h-4 w-4 mr-2"/>
                        Update
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => onCopy(data.id)}>
                        <Copy className="h-4 w-4 mr-2"/>
                        Copy
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setIsOpen(true)}>
                        <Trash className="h-4 w-4 mr-2"/>
                        Delete
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </>
    );
}