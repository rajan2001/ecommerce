import prisma from "@/lib/prismaDb";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function PATCH(
  req: Request,
  { params }: { params: { storeId: string; billboardsId: string } }
) {
  try {
    const { userId } = auth();
    const body = await req.json();

    const { imageUrl, label } = body;

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized", status: 401 });
    }

    if (!imageUrl || !label) {
      return NextResponse.json({ error: "Empty field", status: 400 });
    }

    if (!params.storeId || !params.billboardsId) {
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

    const billboard = await prisma?.billboard.update({
      where: {
        id: params.billboardsId,
        storeId: params.storeId,
      },
      data: {
        label,
        imageUrl,
      },
    });

    return NextResponse.json({ data: billboard });
  } catch (error) {
    console.log("BILLBOARD PATCH", error);
    return NextResponse.json({ error }, { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { storeId: string; billboardsId: string } }
) {
  try {
    const { userId } = auth();

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized", status: 401 });
    }

    if (!params.storeId || !params.billboardsId) {
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

    const billboard = await prisma?.billboard.delete({
      where: {
        id: params.billboardsId,
        storeId: params.storeId,
      },
    });

    return NextResponse.json({ data: billboard });
  } catch (error) {
    console.log("Billboard DELETE", error);
    return NextResponse.json({ error }, { status: 500 });
  }
}
