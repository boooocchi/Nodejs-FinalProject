import { NextResponse, NextRequest } from "next/server";
import { prisma } from "@/db";
import { redirect } from "next/navigation";

export async function POST(req: NextRequest) {
  const body = await req.json();
  console.log("........", body);

  const existingLike = await prisma.favorite.findUnique({
    where: { userId_exampleId: body }
  });
  if (existingLike === null) {
    await prisma.favorite.create({
      data: {
        example: { connect: { id: body.exampleId } },
        user: { connect: { id: body.userId } }
      }
    });
    return NextResponse.json({ addedFavorite: true });
  } else {
    await prisma.favorite.delete({ where: { userId_exampleId: body } });
    return NextResponse.json({ addedFavorite: false });
  }
}
