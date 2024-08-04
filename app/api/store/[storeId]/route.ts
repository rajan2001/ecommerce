import prisma from "@/lib/prismaDb";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function PATCH(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    const { userId } = auth();
    const body = await req.json();

    const { name } = body;

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized", status: 401 });
    }

    if (!name) {
      return NextResponse.json({ error: "Name is Requried", status: 400 });
    }

    if (!params.storeId) {
      return NextResponse.json({
        error: "Store Id is requried",
        status: 400,
      });
    }

    const store = await prisma?.store.update({
      where: {
        id: params.storeId,
        userId,
      },
      data: {
        name: name,
      },
    });

    return NextResponse.json({ data: store });
  } catch (error) {
    console.log("STORE PATCH", error);
    return NextResponse.json({ error }, { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    const { userId } = auth();

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized User", status: 401 });
    }

    if (!params.storeId) {
      return NextResponse.json({
        error: "Store Id is requried",
        status: 400,
      });
    }

    const store = await prisma?.store.delete({
      where: {
        id: params.storeId,
        userId,
      },
    });

    return NextResponse.json({ data: store });
  } catch (error) {
    console.log("STORE DELETE", error);
    return NextResponse.json({ error }, { status: 500 });
  }
}
