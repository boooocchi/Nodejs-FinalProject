import { GoogleSignInButton } from "@/components/authButton";
import { getServerSession } from "next-auth";
import { useSession } from "next-auth/react";
import Image from "next/image";

import logo from "../../public/logo.png";
import { authConfig } from "../../lib/auth";
import { redirect } from "next/navigation";
import SearchInput from "@/components/SearchInput"

export default async function NavigationBar() {
  const session = await getServerSession(authConfig);
  
  return (
    <header className="fixed top-0 z-[99] flex h-[4.5rem] w-full items-center  bg-gray-100 pr-[3rem] shadow-md">
      <ul className="flex w-full items-center justify-between">
        <div className="relative left-0 flex h-[4.5rem] min-w-[15rem] items-center justify-center bg-[#6967ED] text-[3rem] text-white">
          <span className="relative top-1 flex items-center tracking-wide">
            <span className="drop-shadow-md">Sharex. </span>
            <Image className="mb-1 ml-1 h-9 w-9" src={logo} alt="" />
          </span>
        </div>

        <SearchInput></SearchInput>
        {session?.user?.image ? (
          <div className="group ml-auto flex cursor-pointer items-center rounded-full bg-accent py-1 pl-2 pr-4 shadow-md hover:bg-white">
            <img
              src={session.user?.image}
              alt=""
              className="h-10 w-10 rounded-full "
            />
            <span className="relative bottom-[2px] ml-1 font-cycle text-[0.9rem] text-white drop-shadow-md group-hover:text-accent group-hover:drop-shadow-none">
              Hello, {session.user?.name?.split(" ")[0]}
            </span>
          </div>
        ) : (
          <GoogleSignInButton></GoogleSignInButton>
        )}
      </ul>
    </header>
  );
}
