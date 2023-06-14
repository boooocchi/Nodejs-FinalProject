"use client";

import React, { useState } from "react";
import { News_Cycle } from "@next/font/google";
import { FiEdit2 } from "react-icons/fi";
import { MdFavorite } from "react-icons/md";
import Link from "next/link";
import { useRouter } from "next/navigation";

const cycle = News_Cycle({
  subsets: ["latin"],
  weight: ["400"]
});

const Card: React.FC<{
  id: string;
  userId: string;
  createdAt: Date;
  word: string;
  phoneticSign: string | null;
  exSentence: string;
}> = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const cardClass = isOpen
    ? "fixed border-gray flex h-[20rem] w-[18rem] flex-col gap-2 rounded-xl border bg-white px-7 py-5 shadow-md left-[45%] top-[30%]  z-10"
    : "border-gray flex h-[15rem] flex-col gap-2 rounded-xl border bg-white px-7 py-5 shadow-md";
  const openHandler = () => {
    setIsOpen((prev) => {
      return !prev;
    });
  };
  const router = useRouter();

  const editHandler = () => {
    router.push(`/edit/${props.id}`);
  };
  return (
    <div className={cardClass} onClick={openHandler}>
      <h1 className="text-center text-[2.5rem] text-slategray">{props.word}</h1>
      {props.phoneticSign && (
        <h2 className="relative ">
          <span className="mr-1 inline-block h-[0.6rem] w-[0.6rem] rounded-full bg-[#D964E3] align-middle leading-[1.2rem]">
            {" "}
          </span>
          <span className={`relative ${cycle.className} top-[1px]`}>
            {props.phoneticSign}
          </span>
        </h2>
      )}
      <p className={`relative ${cycle.className}`}>
        <span className="mr-1 inline-block h-[0.6rem] w-[0.6rem] rounded-full bg-[#f8f427] align-middle leading-[1.2rem]">
          {" "}
        </span>
        <span className="relative top-[1px] leading-[0.rem]">
          {props.exSentence}
        </span>
      </p>
      {isOpen && (
        <div className="mt-auto flex gap-2 self-end">
          <span className="flex h-[1.8rem] w-[1.8rem]  cursor-pointer items-center justify-center rounded-full bg-[#6967ED]  text-[1rem] text-white shadow-lg hover:bg-light">
            <MdFavorite></MdFavorite>
          </span>
          <span
            // href={`/edit/${props.id}`}
            className="flex h-[1.8rem] w-[1.8rem]  cursor-pointer items-center justify-center rounded-full bg-[#6967ED]  text-[1rem] text-white shadow-lg hover:bg-light"
            onClick={editHandler}
          >
            <FiEdit2></FiEdit2>
          </span>
        </div>
      )}
    </div>
  );
};

export default Card;
