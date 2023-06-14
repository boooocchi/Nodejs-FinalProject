import React from "react";
import { prisma } from "@/db";
import Card from "@/components/Card";
// id String @id @default(uuid())
// userId String
// createdAt DateTime @default(now())
// word String
// phoneticSign String?
// exSentence String
// user User @relation(fields:[userId],references: [id],onDelete: Cascade)

const page = async () => {
  const examples = await prisma.example.findMany();

  return (
    <>
      <div className="mt-[8rem] grid grid-cols-3 gap-5 max-lg:grid-cols-2 max-md:grid-cols-2 xl:grid-cols-4">
        {examples.map((example) => {
          return <Card {...example}></Card>;
        })}
      </div>
    </>
  );
};

export default page;
