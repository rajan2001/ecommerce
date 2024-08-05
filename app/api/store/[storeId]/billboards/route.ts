import { NextResponse } from "next/server";
import prisma from "@/lib/prismaDb";
import { auth } from "@clerk/nextjs/server";

export async function POST(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  const { userId } = auth();
  if (!userId) {
    return NextResponse.json(
      { error: "unauthenticated User" },
      { status: 400 }
    );
  }
  try {
    const body = await req.json();

    const { imageUrl, label } = body;
    if (!label || !imageUrl) {
      return NextResponse.json({ error: "Empty Field" }, { status: 400 });
    }

    const store = await prisma.store.findMany({
      where: {
        id: params.storeId,
      },
    });

    if (!store) {
      return NextResponse.json({ error: "Store not found" }, { status: 400 });
    }

    const billboard = await prisma?.billboard.create({
      data: {
        label: label,
        imageUrl: imageUrl,
        storeId: params.storeId,
      },
    });

    return NextResponse.json({ data: billboard }, { status: 201 });
  } catch (error) {
    console.log("BillBoard_post", error);
    return NextResponse.json({ error }, { status: 500 });
  }
}

export async function GET(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    const store = await prisma.store.findMany({
      where: {
        id: params.storeId,
      },
    });

    if (!store) {
      return NextResponse.json({ error: "Store not found" }, { status: 400 });
    }

    const billboard = await prisma?.billboard.findMany({
      where: {
        storeId: params.storeId,
      },
    });

    return NextResponse.json({ data: billboard }, { status: 200 });
  } catch (error) {
    console.log("BillBoard_GET", error);
    return NextResponse.json({ error }, { status: 500 });
  }
}
