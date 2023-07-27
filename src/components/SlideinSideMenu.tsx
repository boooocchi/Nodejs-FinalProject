"use client";
import React, { MouseEventHandler, useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import Button from "./Button";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { AuthLogoutBtn } from "./authLogoutBtn";

const SlideinSideMenu = () => {
  const session = useSession();
  const [isOpen, setIsOpen] = useState(false);

  const handleSideMenu: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.stopPropagation();
    setIsOpen((prev) => !prev);
  };
  return (
    <>
      <button
        onClick={(e) => handleSideMenu(e)}
        className="relative z-[99] mb-1 mr-4 text-[1.3rem] md:hidden"
      >
        <GiHamburgerMenu></GiHamburgerMenu>
      </button>
      {isOpen && (
        <button
          className=" fixed left-[15rem] top-0 z-10 h-screen w-screen bg-transparent"
          onClick={handleSideMenu}
        ></button>
      )}

      <div
        className={`fixed ${
          isOpen ? "" : "translate-x-[-100%]"
        }  transition-position left-0 top-[4.5rem]  z-[10] h-screen w-[15rem] bg-light duration-200`}
      >
        <ul className="absolute  left-0 top-[3rem] flex w-full flex-col gap-5 text-[2.3rem] text-white">
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
          <Button pageName="favorites" pixel="68">
            Favorite
          </Button>
          <Button pageName="profiles" pixel="130">
            Account
          </Button>
          {session?.status === "authenticated" && (
            <AuthLogoutBtn></AuthLogoutBtn>
          )}
        </ul>
      </div>
    </>
  );
};

export default SlideinSideMenu;
