import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";

import prismadb from "@/lib/prismadb";

export async function POST(
    req: Request,
    {params}: { params: {storeId: string} }
) { 
    try {
        const body = await req.json();
        const { userId } = auth();
        const { name, price, categoryId, sizeId, colorId, images, isFeatured, isArchived } = body;

        if (!userId) {
            return new NextResponse("Unauthenticated", { status: 401 });
        }

        if (!name) {
            return new NextResponse("Missing name", { status: 400 });
        }

        if (!images || !images.length) { 
            return new NextResponse("Missing images", { status: 400 });
        }

        if (!price) {
            return new NextResponse("Missing price", { status: 400 });
        }

        if (!categoryId) {
            return new NextResponse("Missing categoryId", { status: 400 });
        }

        if (!sizeId) {
            return new NextResponse("Missing sizeId", { status: 400 });
        }

        if (!colorId) {
            return new NextResponse("Missing colorId", { status: 400 });
        }

        if (!params.storeId) {
            return new NextResponse("Missing Store ID", { status: 400 });
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

        const product = await prismadb.product.create({
            data: {
                name,
                price,
                categoryId, 
                sizeId, 
                colorId, 
                images: {
                    createMany: {
                        data: [
                            ...images.map((image: { url: string }) => image)
                        ]
                    }
                },
                isFeatured, 
                isArchived,
                storeId: params.storeId,
            }
        });

        return NextResponse.json(product);

    } catch (error) {
        console.log("[PRODUCT_POST]", error);
        return (
            new NextResponse("Internal Server Error", { status: 500})
        );
    }
};

export async function GET(
    req: Request,
    {params}: { params: {storeId: string} }
) { 
    try {
        const { searchParams } = new URL(req.url);
        const categoryId = searchParams.get("categoryId") || undefined;
        const sizeId = searchParams.get("sizeId") || undefined;
        const colorId = searchParams.get("colorId") || undefined;
        const isFeatured = searchParams.get("isFeatured");

        if (!params.storeId) {
            return new NextResponse("Missing Store ID", { status: 400 });
        }

        const products = await prismadb.product.findMany({
            where: {
                storeId: params.storeId,
                categoryId,
                sizeId,
                colorId,
                isFeatured: isFeatured ? true : undefined,
                isArchived: false
            },
            include: {
                images: true,
                category: true,
                size: true,
                color: true,
            },
            orderBy: {
                createdAt: "desc"
            }
        });

        return NextResponse.json(products);

    } catch (error) {
        console.log("[PRODUCTS_GET]", error);
        return (
            new NextResponse("Internal Server Error", { status: 500})
        );
    }
};