import { GoogleSignInButton } from "@/components/authButton";
import { getServerSession } from "next-auth";
import { useSession } from "next-auth/react";
import Image from "next/image";
import defaultUserImg from "../../public/default-user-image.jpg";

import logo from "../../public/logo.png";
import { authConfig } from "../../lib/auth";
import { redirect } from "next/navigation";
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
          <div className="group ml-auto flex cursor-pointer items-center rounded-full bg-accent pb-1 pl-1 pr-1 pt-1 shadow-md hover:bg-white max-xs:justify-center xs:pl-2 xs:pr-4">
            {session?.user.image ? (
              <img
                src={session.user.image}
                alt=""
                className="h-10 w-10 rounded-full "
              />
            ) : (
              <Image
                src={defaultUserImg}
                alt=""
                className="h-10 w-10 rounded-full"
              />
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
