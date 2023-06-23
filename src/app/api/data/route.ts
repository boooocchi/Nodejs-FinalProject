import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/db";
import { redirect } from "next/navigation";

export async function POST(req: NextRequest) {
  const { keyword } = await req.json();
  // const { searchParams } = new URL(req.url);
  // const exId = searchParams.get("id");

  const res = await prisma.example.findMany({
    where: { word: { contains: keyword } }
  });

  return NextResponse.json(res);
}
export async function GET() {
  const res = await prisma.example.findMany();
  console.log(res);
  return NextResponse.json(res);
}
