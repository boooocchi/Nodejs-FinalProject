import React from "react";
import { GetStaticPaths, GetStaticProps } from "next";
import { prisma } from "@/db";
import Form from "@/components/Form";

interface EditProps {
  params: {
    id: string;
  };
}
type EditType = ({ params }: EditProps) => Promise<JSX.Element | void>;

export const revalidate = 0;
const Edit: EditType = async ({ params }) => {
  const example = await prisma.example.findUnique({ where: { id: params.id } });

  console.log(example);

  return <Form example={example}></Form>;
};

export async function generateStaticParams() {
  const examples = await prisma.example.findMany();

  return examples.map((example) => ({ id: example.id }));
}

// export const getStaticProps = async ({ params }) => {
//   const { id } = params;
//   const example = await prisma.example.findUnique({ where: id });

//   return {
//     props: {
//       id,
//       example
//     }
//   };
// };

export default Edit;
