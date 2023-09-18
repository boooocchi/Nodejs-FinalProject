"use client";

import React, { ReactNode } from "react";
import Link from "next/link";
import { useAuth } from "../../../utils/session";
import { SessionWithId } from "../../../utils/type";

const Button = ({
  pageName,
  pixel,
  children
}: {
  pageName: string;
  pixel: string;
  children: ReactNode;
}) => {
  const { session } = useAuth();

  return (
    <Link
      as={`/${pageName}/${session?.user?.id}`}
      href={`/${pageName}/${session?.user?.id}`}
      className="group flex h-[3rem] w-full items-center duration-200 hover:bg-rich "
    >
      <span className="ml-[3.5rem] mt-[10px] inline-block drop-shadow-md">
        {children}
      </span>
      <div
        className={`group-hover:opacity-1  absolute right-0 top-[${pixel}px]
  h-0 w-0
  translate-x-[100%] border-b-[24px] border-l-[15px]  border-t-[24px] border-b-transparent border-l-transparent border-t-transparent transition duration-200 group-hover:border-l-rich`}
      ></div>
    </Link>
  );
};

export default Button;
