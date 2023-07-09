"use client";

import { Plus } from "lucide-react";

import { Heading } from "@/components/ui/Heading";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export const BillboardClient = () => {
    return (
        <>
            <div className="flex items-center justify-between">
                <Heading 
                    title="Billboards (0)"
                    description="Billboards are a great way to advertise your store."
                />
                <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Add new
                </Button>
            </div>
            <Separator />
        </>
    )
}