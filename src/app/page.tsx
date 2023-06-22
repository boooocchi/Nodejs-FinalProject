"use client";
import React, { useState } from "react";
import Card from "@/components/Card";
import Link from "next/link";

import NavigationBar from "@/components/NavigationBar";

// id String @id @default(uuid())
// userId String
// createdAt DateTime @default(now())
// word String
// phoneticSign String?
// exSentence String
// user User @relation(fields:[userId],references: [id],onDelete: Cascade)

export const revalidate = 0;

const page = (props: any) => {
  const [examples, setExamples] = useState(props.params.newData);
  console.log(examples);
  return (
    <>
    
      <div className="relative mt-[7rem] flex w-full items-center justify-between">
        <div className="absolute left-[-80px] top-[0px] h-0 w-0 border-b-[24px] border-l-[15px] border-t-[24px] border-b-transparent border-l-light border-t-transparent"></div>
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
        <div className="flex items-center">
          <Link
            href="/new"
            className="border-3 group flex  h-9 w-9 cursor-pointer items-center justify-center rounded-full border border-rich  bg-white text-[2.5rem] font-light text-rich shadow-md hover:bg-rich"
          >
            <span className="relative top-[2px] group-hover:text-white">+</span>
          </Link>
          <span className="ml-2 translate-y-[2px] text-2xl text-rich">
            Add New Ex.
          </span>
        </div>
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
