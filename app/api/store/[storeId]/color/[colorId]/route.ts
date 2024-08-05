import prisma from "@/lib/prismaDb";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function PATCH(
  req: Request,
  { params }: { params: { storeId: string; colorId: string } }
) {
  try {
    const { userId } = auth();
    const body = await req.json();

    const { value, name } = body;

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized", status: 401 });
    }

    if (!value || !name) {
      return NextResponse.json({ error: "Empty field", status: 400 });
    }

    if (!params.storeId || !params.colorId) {
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

    const color = await prisma?.color.update({
      where: {
        id: params.colorId,
        storeId: params.storeId,
      },
      data: {
        name,
        value,
      },
    });

    return NextResponse.json({ data: color });
  } catch (error) {
    console.log("COLOR PATCH", error);
    return NextResponse.json({ error }, { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { storeId: string; colorId: string } }
) {
  try {
    const { userId } = auth();

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized", status: 401 });
    }

    if (!params.storeId || !params.colorId) {
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

    const color = await prisma?.color.delete({
      where: {
        id: params.colorId,
        storeId: params.storeId,
      },
    });

    return NextResponse.json({ data: color });
  } catch (error) {
    console.log("COLOR DELETE", error);
    return NextResponse.json({ error }, { status: 500 });
  }
}
