import React from "react";
import CardContainer from "@/components/CardContainer";
import Link from "next/link";
const page = ({ params }: any) => {
  const { id } = params;
  return (
    <>
      <div className="relative mt-[7rem] flex w-full items-center justify-end">
        <div className="fixed left-[240px]  top-[180px] h-0 w-0 border-b-[24px] border-l-[15px] border-t-[24px] border-b-transparent border-l-light border-t-transparent max-md:hidden"></div>

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
      <CardContainer userId={id}></CardContainer>
    </>
  );
};

export default page;
