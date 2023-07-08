"use server";
import { prisma } from "@/db";

export async function updateEx(id: any, values: any) {
  console.log("hi");
  return await prisma.example.update({
    where: { id: id },
    data: {
      word: values.word,
      meaning: values.meaning,
      phoneticSign: values.phoneticSign,

      exSentence: values.exSentence
    }
  });
}
