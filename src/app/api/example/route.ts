import { NextRequest } from "next/server";
import { prisma } from "@/db";
import { redirect } from "next/navigation";
export async function POST(req: NextRequest) {
  const body = await req.json();

  const hi = await prisma.example.update({
    where: { id: body.id },
    data: {
      word: body.word,
      phoneticSign: body.phoneticSign,
      exSentence: body.exSentence
    }
  });
}

export async function DELETE(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const exId = searchParams.get("id");

  const hi = await prisma.example
    .delete({
      where: { id: exId?.toString() }
    })
    .finally(() => {
      redirect("/");
    });
}
