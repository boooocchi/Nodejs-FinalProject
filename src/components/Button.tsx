"use client";

import React, { ReactNode } from "react";
import Link from "next/link";
import { useAuth } from "../../utils/session";

const Button = ({
  pageName,
  children
}: {
  pageName: string;
  children: ReactNode;
}) => {
  const { session } = useAuth();

  return (
    <Link
      as={`/${pageName}/${session?.user?.id}`}
      href={`/${pageName}/${session?.user?.id}`}
      className="flex h-[3rem] w-full items-center hover:bg-rich"
    >
      <span className="ml-[3.5rem] mt-[10px] inline-block drop-shadow-md">
        {children}
      </span>
    </Link>
  );
};

export default Button;
