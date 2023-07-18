"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Billboard } from "@prisma/client";
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
import ImageUploader from "@/components/ImageUploader";

interface BillboardFormProps {
    initialData: Billboard | null;
}

const formSchema = z.object({
    label: z.string().min(1),
    imageUrl: z.string().min(1),
});

type BillboardFormValues = z.infer<typeof formSchema>;


export const BillboardForm: React.FC<BillboardFormProps> = ({
    initialData,
}) => {
    const params = useParams();
    const router = useRouter();
    const [isOpen, setIsOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const form = useForm<BillboardFormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: initialData || {
            label: "",
            imageUrl: "",
        },
    });

    const title = initialData ? "Edit Billboard" : "Create Billboard";
    const description = initialData ? "Edit a Billboard" : "Add new Billboard";
    const toastMessage = initialData ? "Billboard Updated!" : "Billboard created successfully";
    const action = initialData ? "Save changes" : "Create";

    const onSubmit = async (data: BillboardFormValues) => {
        try {
            setIsLoading(true);
            if (initialData) {
                await axios.patch(`/api/${params.storeId}/billboards/${params.billboardId}`, data);
            } else {
                await axios.post(`/api/${params.storeId}/billboards`, data);
            }
            router.refresh();
            router.push(`/${params.storeId}/billboards`);
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

            await axios.delete(`/api/${params.storeId}/billboards/${params.billboardId}`);
            router.refresh();
            router.push(`/${params.storeId}/billboards`);

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
                    <FormField 
                        name="imageUrl"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Billboard Image</FormLabel>
                                <FormControl>
                                    <ImageUploader 
                                        value={field.value ? [field.value] : []}
                                        onChange={(url) => field.onChange(url)}
                                        onRemove={() => field.onChange("")}
                                        disabled={isLoading}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                        control={form.control}
                    />
                    <div className="grid grid-cols-3 gap-8">
                        <FormField 
                            name="label"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Label</FormLabel>
                                    <FormControl>
                                        <Input 
                                            {...field}
                                            placeholder="Billboard Label"
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