import React from "react";
import { prisma } from "@/db";
import Card from "@/components/Card";
import Link from "next/link";
import { authConfig } from "../../lib/auth";
import { getServerSession } from "next-auth";

const page = async () => {
  const session = await getServerSession(authConfig);

  if (session?.user) {
    const user = await prisma.user.findUnique({
      where: { email: session?.user?.email || undefined }
    });

    if (!user) {
      const userData = await prisma.user.create({
        data: {
          name: session.user.name || "",
          email: session.user.email || "",
          password: ""
        }
      });
    }
  }

  const examples = await prisma.example.findMany();

  return (
    <>
      <div className="relative mt-[7rem] flex w-full items-center justify-between">
        <div
          className="absolute left-[-80px] top-[0px]
  h-0 w-0
  border-b-[24px] border-l-[15px]
  border-t-[24px] border-b-transparent border-l-light border-t-transparent"
        ></div>
        <div>
          <ul className="flex gap-2">
            <button className="rounded-full border border-rich px-3 py-1 text-center font-cycle text-[.9rem] ">
              <span className="translate-y-[-2px]">Date</span>
            </button>
            <button className="rounded-full border border-rich px-3 py-1 text-center font-cycle text-[.9rem]">
              <span className="">Word</span>
            </button>
            <button className="rounded-full border border-rich px-3 py-1 text-center font-cycle text-[.9rem]">
              <span className="">User</span>
            </button>
          </ul>
        </div>
        {session?.user && (
          <div className="flex items-center">
            <Link
              href="/new"
              className="border-3 group flex  h-9 w-9 cursor-pointer items-center justify-center rounded-full border border-rich  bg-white text-[2.5rem] font-light text-rich shadow-md hover:bg-rich"
            >
              <span className="relative top-[2px] group-hover:text-white">
                +
              </span>
            </Link>
            <span className="ml-2 translate-y-[2px] text-2xl text-rich">
              Add New Ex.
            </span>
          </div>
        )}
      </div>
      <div className="relative mt-[3rem] grid grid-cols-3 gap-5 max-lg:grid-cols-2 max-md:grid-cols-2 xl:grid-cols-4">
        {examples.map((example) => {
          return <Card {...example}></Card>;
        })}
      </div>
    </>
  );
};

export default page;
