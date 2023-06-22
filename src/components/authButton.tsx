"use client";

import { AiFillGoogleCircle } from "react-icons/ai";
import { getSession, signIn } from "next-auth/react";
// import { useSession } from "next-auth/react";
import { authConfig } from "../../lib/auth";

export function GoogleSignInButton() {
  // const { data: session } = useSession();
  const handleClick = async () => {
    signIn("google");
    // console.log("/////////////", result);
  };

  return (
    <div
      className="group ml-auto flex cursor-pointer items-center rounded-full border border-gray-300 px-3 py-1 shadow-sm hover:bg-rich"
      onClick={handleClick}
    >
      <button className="z-99  text-[2rem] text-accent">
        <AiFillGoogleCircle className="group-hover:text-[white]"></AiFillGoogleCircle>
      </button>
      <span className="relative bottom-[2px] ml-1 font-cycle text-[0.9rem] group-hover:text-white">
        Login with Google
      </span>
    </div>
  );
}
