import React from "react";
import { prisma } from "@/db";
import Form from "@/components/Form";

interface EditProps {
  params: {
    id: string;
  };
}
type EditType = ({ params }: EditProps) => Promise<JSX.Element | void>;

const Edit: EditType = async ({ params }) => {
  const example = await prisma.example.findUnique({ where: { id: params.id } });

  return <Form example={example}></Form>;
};

async function staticParams() {
  const examples = await prisma.example.findMany();

  return examples.map((example) => ({ id: example.id }));
}

// fix "dynamic server usage" errors in dev mode by turning off static generation and forcing dynamic rendering
export const generateStaticParams =  process.env.NODE_ENV === "production" ? staticParams :  undefined;
export const dynamic =  process.env.NODE_ENV === "production" ? 'auto' : 'force-dynamic';

export default Edit;
