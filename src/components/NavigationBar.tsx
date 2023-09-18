import { GoogleSignInButton } from "@/components/button/GoogleSignInButton";
import { getServerSession } from "next-auth";
import { useSession } from "next-auth/react";
import Image from "next/image";
import defaultUserImg from "../../public/default-user-image.jpg";

import logo from "../../public/logo.png";
import { authConfig } from "../../lib/auth";
import SearchInput from "@/components/SearchInput";
import SlideinSideMenu from "@/components/SlideinSideMenu";
import Link from "next/link";

export default async function NavigationBar() {
  const session = await getServerSession(authConfig);

  return (
    <header className="shadow-md: fixed top-0 z-[99] flex h-[4.5rem]  w-full items-center bg-gray-100 pr-[1.5rem] max-md:bg-rich xs:pr-[2rem] md:pr-[3rem]">
      <ul className="flex w-full items-center justify-between">
        <div className="relative left-0 z-[97] flex h-[4.5rem] min-w-[15rem] items-center bg-[#6967ED]   pl-[1.5rem] text-[3rem] text-white xs:pl-[2rem] md:pl-[3rem]">
          <span className="relative top-1 z-[98] flex items-center tracking-wide">
            <span>
              <SlideinSideMenu></SlideinSideMenu>
            </span>
            <Link className="relative z-[99] flex items-center" href="/">
              <span className="drop-shadow-md">Sharex.</span>
              <Image
                className="relative z-[99] mb-2 ml-1 h-9 w-9"
                src={logo}
                alt=""
              />
            </Link>
          </span>
        </div>
        <span className="max-md:hidden">
          <SearchInput></SearchInput>
        </span>
        {session?.user ? (
          <div className="group ml-auto flex cursor-pointer items-center rounded-full bg-accent py-1 pl-1 pr-1 shadow-md hover:bg-white max-xs:justify-center xs:pl-2 xs:pr-4">
            {session?.user.image ? (
              <img
                src={session.user.image}
                alt=""
                className="h-10 w-10 rounded-full "
              />
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="#555"
                className="w-8 h-8"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
            )}

            <span className="relative bottom-[2px] ml-1  font-cycle text-[0.9rem] text-white drop-shadow-md group-hover:text-accent group-hover:drop-shadow-none max-xs:hidden">
              <span>Hello, </span>
              {session.user?.name?.split(" ")[0]}
            </span>
          </div>
        ) : (
          <GoogleSignInButton></GoogleSignInButton>
        )}
      </ul>
    </header>
  );
}
