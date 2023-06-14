import React from "react";
import { GetStaticPaths, GetStaticProps } from "next";
import { prisma } from "@/db";

const Edit = () => {
  return <div className="mt-96">Edit kokoko</div>;
};

export async function generateStaticParams() {
  const examples = await prisma.example.findMany();
  console.log(examples);

  return examples.map((example) => ({ id: example.id }));
}

export default Edit;
