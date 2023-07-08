import React, { useState } from "react";
import CardContainer from "@/components/CardContainer";
import Link from "next/link";
import { getServerSession } from "next-auth";
import NavigationBar from "@/components/NavigationBar";

export const revalidate = 0;

const page = async () => {
  const session = await getServerSession();

  return (
    <>
      <div className="mt-[7rem] flex w-full items-center justify-between">
        <div className="fixed left-[240px] top-[112px] h-0 w-0 border-b-[24px] border-l-[15px] border-t-[24px] border-b-transparent border-l-light border-t-transparent max-md:hidden"></div>
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
            <span className="ml-2 translate-y-[2px] text-2xl text-rich max-xs:hidden">
              Add New Ex.
            </span>
          </div>
        )}
      </div>
      <CardContainer></CardContainer>
    </>
  );
};

export default page;
