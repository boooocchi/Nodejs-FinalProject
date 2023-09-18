"use client";

import { AiFillGoogleCircle } from "react-icons/ai";
import { signIn } from "next-auth/react";

export function GoogleSignInButton() {
  const handleClick = () => {
    signIn("google");
  };

  return (
    <div
      className="group ml-auto flex cursor-pointer items-center rounded-full border border-gray-300 bg-gray-100 px-3 shadow-sm hover:bg-rich  max-xs:px-2 max-xs:py-[3px] xs:py-1"
      onClick={handleClick}
    >
      <button className="z-99  text-[2rem] text-accent">
        <AiFillGoogleCircle className="group-hover:text-[white]"></AiFillGoogleCircle>
      </button>
      <span className="relative bottom-[2px] font-cycle text-[0.9rem] group-hover:text-white max-xs:ml-[2px] max-xs:mr-1 xs:ml-1">
        Login<span className="max-md:hidden"> with Google</span>
      </span>
    </div>
  );
}
