import prisma from "@/lib/prismaDb";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function PATCH(
  req: Request,
  { params }: { params: { storeId: string; productId: string } }
) {
  try {
    const { userId } = auth();
    const body = await req.json();

    const {
      name,
      price,
      categoryId,
      colorId,
      sizeId,
      isFeatured,
      isArchived,
      images,
    } = body;

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized", status: 401 });
    }

    if (!name || !price || !categoryId || !colorId || !sizeId || !images) {
      return NextResponse.json({ error: "Empty Field" }, { status: 400 });
    }

    if (!params.storeId || !params.productId) {
      return NextResponse.json({
        error: "Id is requried",
        status: 400,
      });
    }

    const store = await prisma.store.findMany({
      where: {
        id: params.storeId,
      },
    });

    if (!store) {
      return NextResponse.json({ error: "Store not found" }, { status: 400 });
    }

    await prisma?.product.update({
      where: {
        id: params.productId,
        storeId: params.storeId,
      },
      data: {
        name,
        categoryId,
        colorId,
        sizeId,
        price,
        isFeatured,
        isArchived,
        images: {
          deleteMany: {},
        },
      },
    });

    const product = await prisma.product.update({
      where: {
        id: params.productId,
        storeId: params.storeId,
      },
      data: {
        images: {
          createMany: {
            data: [...images.map((image: { url: string }) => image)],
          },
        },
      },
    });

    return NextResponse.json({ data: product });
  } catch (error) {
    console.log("PRODUCT PATCH", error);
    return NextResponse.json({ error }, { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { storeId: string; productId: string } }
) {
  try {
    const { userId } = auth();

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized", status: 401 });
    }

    if (!params.storeId || !params.productId) {
      return NextResponse.json({
        error: "Id is requried",
        status: 400,
      });
    }

    const store = await prisma.store.findMany({
      where: {
        id: params.productId,
      },
    });

    if (!store) {
      return NextResponse.json({ error: "Store not found" }, { status: 400 });
    }

    const product = await prisma?.product.delete({
      where: {
        id: params.productId,
        storeId: params.storeId,
      },
    });

    return NextResponse.json({ data: product });
  } catch (error) {
    console.log("SIZE DELETE", error);
    return NextResponse.json({ error }, { status: 500 });
  }
}
