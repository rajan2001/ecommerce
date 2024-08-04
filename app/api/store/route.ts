import { NextResponse } from "next/server";
import prisma from "@/lib/prismaDb";
import { auth } from "@clerk/nextjs/server";

export async function POST(req: Request) {
  const { userId } = auth();
  if (!userId) {
    return NextResponse.json(
      { error: "unauthenticated User" },
      { status: 400 }
    );
  }
  try {
    const body = await req.json();
    const { name } = body;
    if (!name) {
      return NextResponse.json({ error: "Empty Field" }, { status: 400 });
    }

    const store = await prisma?.store.create({
      data: {
        name,
        userId,
      },
    });

    return NextResponse.json({ data: store }, { status: 201 });
  } catch (error) {
    console.log("Stores_post", error);
    return NextResponse.json({ error }, { status: 500 });
  }
}
