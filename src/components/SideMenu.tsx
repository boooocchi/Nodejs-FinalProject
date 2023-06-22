import Link from "next/link";

import { getServerSession } from "next-auth";

import { AuthLogoutBtn } from "@/components/authLogoutBtn";
import { authConfig } from "../../lib/auth";
import Button from "./Button";

export default async function SideMenu() {
  const session = await getServerSession(authConfig);

  return (
    <div className="relative z-[97] h-full min-h-screen w-[15rem] min-w-[15rem] bg-light ">
      <ul className="absolute left-0 top-[7rem] flex w-full flex-col gap-5 text-[2.3rem] text-white">
        <Link
          as={"/"}
          href="/"
          className="transition-color group relative flex h-[3rem] w-full items-center duration-200 hover:bg-rich"
        >
          <span className="ml-[3.5rem] mt-[10px] inline-block drop-shadow-md">
            Feed
          </span>
          <div
            className="group-hover:opacity-1  absolute right-0 top-0
  h-0 w-0
  translate-x-[100%] border-b-[24px] border-l-[15px]  border-t-[24px] border-b-transparent border-l-transparent border-t-transparent transition duration-200 group-hover:border-l-rich"
          ></div>
        </Link>
        <Link
          as={"/"}
          href="/"
          className="flex h-[3rem] w-full items-center hover:bg-rich"
        >
          <span className="ml-[3.5rem] mt-[10px] inline-block drop-shadow-md">
            Mine
          </span>
        </Link>
        <Button>Account</Button>
        {session?.user && <AuthLogoutBtn></AuthLogoutBtn>}
      </ul>
    </div>
  );
}
