import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/db";

export async function POST(req: NextRequest) {
  const { keyword } = await req.json();
  const res = await prisma.example.findMany({
    where: { word: { contains: keyword } },
    include: {
      favorite: true
    }
  });

  return NextResponse.json(res);
}
export async function GET() {
  const res = await prisma.example.findMany({
    include: {
      favorite: true
    }
  });
  return NextResponse.json(res);
}

// export async function POSTfav(req: NextRequest) {
//   const { id } = await req.json();

//   const res = await prisma.example.findMany({
//     include: {
//       favorite: true
//     }
//   });
//   return NextResponse.json(res);
// }
