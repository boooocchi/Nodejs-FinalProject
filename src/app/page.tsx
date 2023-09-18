import React, { useState } from "react";
import CardContainer from "@/components/CardContainer";
import Link from "next/link";
import { getServerSession } from "next-auth";
import NavigationBar from "@/components/NavigationBar";
import DataSortButton from "@/components/button/DataSortButton";
import NewPostButton from "@/components/button/NewPostButton";

export const revalidate = 0;

const page = async () => {
  const session = await getServerSession();

  return (
    <>
      <div className="mt-[7rem] flex w-full items-center justify-between">
        <div className="fixed left-[240px] top-[112px] h-0 w-0 border-b-[24px] border-l-[15px] border-t-[24px] border-b-transparent border-l-light border-t-transparent max-md:hidden"></div>
        <div>
          <ul className="flex gap-2">
            <DataSortButton sortKeyword="createdAt">Date</DataSortButton>
            <DataSortButton sortKeyword="word">Word</DataSortButton>
          </ul>
        </div>
        {session?.user && <NewPostButton />}
      </div>
      <CardContainer></CardContainer>
    </>
  );
};

export default page;
