import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/db";

export async function POST(req: NextRequest) {
  const { method, order } = await req.json();
  console.log("////////", method, order);
  const res = await prisma.example.findMany({
    include: {
      favorite: true
    },
    orderBy: {
      [method]: order
    }
  });
  return NextResponse.json(res);
}
