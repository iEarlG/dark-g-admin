"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Color } from "@prisma/client";
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

interface ColorFormProps {
    initialData: Color | null;
}

const formSchema = z.object({
    name: z.string().min(1),
    value: z.string().min(4).regex(/^#/, {
        message: "Must be a valid hex color code.",
    }),
});

type ColorFormValues = z.infer<typeof formSchema>;


export const ColorForm: React.FC<ColorFormProps> = ({
    initialData,
}) => {
    const params = useParams();
    const router = useRouter();
    const [isOpen, setIsOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const form = useForm<ColorFormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: initialData || {
            name: "",
            value: "",
        },
    });

    const title = initialData ? "Edit Colors" : "Create Colors";
    const description = initialData ? "Edit a Colors" : "Add new Colors";
    const toastMessage = initialData ? "Colors Updated!" : "Colors created successfully";
    const action = initialData ? "Save changes" : "Create";

    const onSubmit = async (data: ColorFormValues) => {
        try {
            setIsLoading(true);
            if (initialData) {
                await axios.patch(`/api/${params.storeId}/colors/${params.colorId}`, data);
            } else {
                await axios.post(`/api/${params.storeId}/colors`, data);
            }
            router.refresh();
            router.push(`/${params.storeId}/colors`);
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

            await axios.delete(`/api/${params.storeId}/colors/${params.colorId}`);
            router.refresh();
            router.push(`/${params.storeId}/color`);

            toast.success("Colors deleted successfully.");
        } catch (error) {
            toast.error("Make sure you don't have any product using this color.");
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
                                            placeholder="Color name"
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
                                        <div className="flex items-center gap-x-4">
                                            <Input 
                                                {...field}
                                                placeholder="# Color value"
                                                disabled={isLoading}
                                            />
                                            <div 
                                                className="rounded-full p-4 border"
                                                style={{ backgroundColor: field.value }}
                                            />
                                        </div>
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