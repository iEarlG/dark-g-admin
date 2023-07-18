import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";

import prismadb from "@/lib/prismadb";

export async function GET(
    req: Request,
    { params }: { params: { categoryId: string } }
) { 
    try {
        if (!params.categoryId) {
            return (
                new NextResponse("Category ID is required", { status: 400 })
            );
        }

        const category = await prismadb.category.findUnique({
            where: {
                id: params.categoryId,
            }
        });

        return NextResponse.json(category);

    } catch (error) {
        console.log("[CATEGORIES GET ERROR]", error);
        return (
            new NextResponse("Internal Server Error", { status: 500 })
        );
    }
};

export async function PATCH(
    req: Request,
    { params }: { params: { storeId: string, categoryId: string } }
) { 
    try {
        const { userId } = auth();
        const body = await req.json();
        const { name, billboardId } = body;

        if (!userId) {
            return (
                new NextResponse("Unauthenticated Personel", { status: 401 })
            );
        }

        if (!name) {
            return (
                new NextResponse("Name is required", { status: 400 })
            );
        }

        if (!billboardId) {
            return (
                new NextResponse("Billboard is required", { status: 400 })
            );
        }

        if (!params.categoryId) {
            return (
                new NextResponse("Category ID is required", { status: 400 })
            );
        }

        const storeByUserId = await prismadb.store.findFirst({
            where: {
                id: params.storeId,
                userId
            }
        });
        
        if (!storeByUserId) {
            return new NextResponse("Unauthorized User", { status: 403 });
        }

        const category = await prismadb.category.updateMany({
            where: {
                id: params.categoryId,
            },
            data: {
                name,
                billboardId
            }
        });

        return NextResponse.json(category);

    } catch (error) {
        console.log("[CATEGORIES PATCH ERROR]", error);
        return (
            new NextResponse("Internal Server Error", { status: 500 })
        );
    }
};

export async function DELETE(
    req: Request,
    { params }: { params: { categoryId: string, storeId: string } }
) { 
    try {
        const { userId } = auth();

        if (!userId) {
            return (
                new NextResponse("Unauthenticated Personel", { status: 401 })
            );
        }

        if (!params.categoryId) {
            return (
                new NextResponse("Category ID is required", { status: 400 })
            );
        }

        const storeByUserId = await prismadb.store.findFirst({
            where: {
                id: params.storeId,
                userId
            }
        });
        
        if (!storeByUserId) {
            return new NextResponse("Unauthorized User", { status: 403 });
        }

        const category = await prismadb.category.deleteMany({
            where: {
                id: params.categoryId,
            }
        });

        return NextResponse.json(category);

    } catch (error) {
        console.log("[CATEGORY DELETE ERROR]", error);
        return (
            new NextResponse("Internal Server Error", { status: 500 })
        );
    }
};