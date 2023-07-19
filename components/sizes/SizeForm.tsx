"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Size } from "@prisma/client";
import { toast } from "react-hot-toast";
import { useParams, useRouter } from "next/navigation";
import * as z from "zod";
import axios from "axios";

import { Trash } from "lucide-react";

import { Heading } from "@/components/ui/Heading";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { AlertModal } from "@/components/modals/AlertModal";

interface SizeFormProps {
    initialData: Size | null;
}

const formSchema = z.object({
    name: z.string().min(1),
    value: z.string().min(1),
});

type SizeFormValues = z.infer<typeof formSchema>;


export const SizeForm: React.FC<SizeFormProps> = ({
    initialData,
}) => {
    const params = useParams();
    const router = useRouter();
    const [isOpen, setIsOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const form = useForm<SizeFormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: initialData || {
            name: "",
            value: "",
        },
    });

    const title = initialData ? "Edit Sizes" : "Create Sizes";
    const description = initialData ? "Edit a Sizes" : "Add new Sizes";
    const toastMessage = initialData ? "Sizes Updated!" : "Sizes created successfully";
    const action = initialData ? "Save changes" : "Create";

    const onSubmit = async (data: SizeFormValues) => {
        try {
            setIsLoading(true);
            if (initialData) {
                await axios.patch(`/api/${params.storeId}/sizes/${params.sizeId}`, data);
            } else {
                await axios.post(`/api/${params.storeId}/sizes`, data);
            }
            router.refresh();
            router.push(`/${params.storeId}/sizes`);
            toast.success(toastMessage);
            
        } catch (error) {
            toast.error("Something went wrong.");
        } finally {
            setIsLoading(false);
        }
    };

    const onDelete = async () => {
        try {
            setIsLoading(true);

            await axios.delete(`/api/${params.storeId}/sizes/${params.sizeId}`);
            router.refresh();
            router.push(`/${params.storeId}/sizes`);

            toast.success("Sizes deleted successfully.");
        } catch (error) {
            toast.error("Make sure you have no products in your store inside the sizes.");
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
            <div className="flex items-center justify-between">
                <Heading 
                    title={title}
                    description={description}
                />
                {initialData && (
                    <Button 
                        variant="destructive"
                        size="sm"
                        disabled={isLoading}
                        onClick={() => setIsOpen(true)}
                    >
                        <Trash className="h-4 w-4" />
                    </Button>
                )}
            </div>
            <Separator />
            <Form {...form}>
                <form 
                    className="w-full space-y-8"
                    onSubmit={form.handleSubmit(onSubmit)} 
                >
                    <div className="grid grid-cols-3 gap-8">
                        <FormField 
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                        <Input 
                                            {...field}
                                            placeholder="Size name"
                                            disabled={isLoading}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                            control={form.control}
                        />
                        <FormField 
                            name="value"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Value</FormLabel>
                                    <FormControl>
                                        <Input 
                                            {...field}
                                            placeholder="Size value"
                                            disabled={isLoading}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                            control={form.control}
                        />
                    </div>
                    <Button disabled={isLoading} className="ml-auto" type="submit">
                        {action}
                    </Button>
                </form>
            </Form>
        </>
    );
}