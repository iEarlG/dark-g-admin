"use client";

import { useState } from "react";
import { ChevronsUpDown, Store as StoreIcon } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { Store } from "@prisma/client";

import { cn } from "@/lib/utils";
import { useStoreModal } from "@/hooks/useStoreModal";
import { Popover, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";

type PopoverTriggerProps = React.ComponentPropsWithRef<typeof PopoverTrigger>

interface StoreSwitcherProps extends PopoverTriggerProps {
    items: Store[];
};

export default function StoreSwitcher({
    className,
    items = [],
} : StoreSwitcherProps) {
    const [isOpen, setIsOpen] = useState(false);
    const params = useParams();
    const router = useRouter();
    const storeModal = useStoreModal();

    const formattedItems = items.map((item) => ({
        label: item.name,
        value: item.id,
    }));

    const currentStore = formattedItems.find((item) => item.value === params.storeId);

    const onSelectStore = (store: {label: string, value: string}) => {
        setIsOpen(false);
        router.push(`/${store.value}`);
    }

    return (
        <Popover
            open={isOpen}
            onOpenChange={setIsOpen}
        >
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    size="sm"
                    role="combobox"
                    aria-expanded={isOpen}
                    aria-label="Store"
                    className={cn("w-[200px] justify-between", className)}
                >
                    <StoreIcon className="h-4 w-4 mr-2" />
                    Current Store
                    <ChevronsUpDown className="h-4 w-4 shrink-0 opacity-50 ml-auto" />
                </Button>
            </PopoverTrigger>
        </Popover>
    )
}