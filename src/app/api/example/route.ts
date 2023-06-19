import { NextRequest } from "next/server";
import { prisma } from "@/db";
import { NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const feedUrl = new URL("/", req.url);
  const hi = await prisma.example.update({
    where: { id: body.id },
    data: {
      word: body.word,
      phoneticSign: body.phoneticSign,
      exSentence: body.exSentence
    }
  });
  return NextResponse.redirect(feedUrl);
}

export async function DELETE(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const exId = searchParams.get("id");
  const feedUrl = new URL("/", req.url);

  const hi = await prisma.example.delete({
    where: { id: exId?.toString() }
  });
  // redirect("/");
  return NextResponse.redirect(feedUrl);
}
