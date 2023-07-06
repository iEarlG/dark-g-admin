"use client";

import { useState } from "react";
import { Check, ChevronsUpDown, PlusCircle, Store as StoreIcon } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { Store } from "@prisma/client";

import { cn } from "@/lib/utils";
import { useStoreModal } from "@/hooks/useStoreModal";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandSeparator } from "@/components/ui/command";

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
            <PopoverContent className="w-[200px] p-0">
                <Command>
                    <CommandList>
                        <CommandInput placeholder="Search store" />
                        <CommandEmpty>No Store found!</CommandEmpty>
                        <CommandGroup heading="Stores">
                            {formattedItems.map((store) => (
                                <CommandItem
                                    key={store.value}
                                    onSelect={() => onSelectStore(store)}
                                    className="text-sm"
                                >
                                    <StoreIcon className="w-4 h-4 mr-2" />
                                    {store.label}
                                    <Check 
                                        className={cn("h-4 w-4 ml-auto",
                                            currentStore?.value === store.value ? "opacity-100" : "opacity-0"
                                        )}
                                    />
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </CommandList>
                    <CommandSeparator />
                    <CommandList>
                        <CommandGroup>
                            <CommandItem
                                onSelect={() => {
                                    setIsOpen(false);
                                    storeModal.onOpen();
                                }}
                            >
                                <PlusCircle className="h-5 w-5 mr-2" />
                                Create Store
                            </CommandItem>
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    )
}