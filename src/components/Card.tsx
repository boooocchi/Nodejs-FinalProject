"use client";

import React, { useEffect, useState } from "react";
import { News_Cycle } from "@next/font/google";
import { FiEdit2 } from "react-icons/fi";
import { MdFavorite, MdDelete } from "react-icons/md";
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
    ? "fixed border-gray flex h-[23rem] w-[20rem] flex-col gap-2 rounded-xl border bg-white px-7 py-5 shadow-md left-[45%] top-[28%]  z-10 hover:bottom-1"
    : "border-gray flex h-[15rem] flex-col gap-2 rounded-xl border bg-white px-7 py-5 shadow-md hover:translate-y-[-3%] hover:scale-105 transition-transform";
  const openHandler = () => {
    setIsOpen(true);
  };

  // const closeHandler = () => {
  //   setIsOpen(false);
  // };
  const router = useRouter();

  const editHandler = (e: any) => {
    e.stopPropagation();
    router.push(`/edit/${props.id}`);
  };
  const closeButton = (
    <div
      className="z-99 absolute right-[-20%] top-[-80%] flex h-[1.8rem] w-[1.8rem] cursor-pointer items-center justify-center rounded-full text-white hover:bg-[#6967ED] hover:shadow-md"
      onClick={(e) => {
        e.stopPropagation();
        setIsOpen(false);
      }}
    >
      <span className="relative top-[2px] text-[2.2rem]">×</span>
    </div>
  );
  const deleteHandler = async (e: any) => {
    e.preventDefault();
    console.log(props.id);
    fetch(`/api/example?id=${props.id}`, {
      method: "DELETE"
    })
      .then((response) => {
        if (response.ok) {
          console.log("Blog deleted successfully");
        } else {
          console.error("Failed to delete");
        }
      })
      .catch((error) => {
        console.error("Network error:", error);
      });
  };

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 z-10 bg-[rgba(1,1,1,0.3)]"></div>
      )}
      <div className={cardClass} onClick={openHandler}>
        <h1 className="relative text-center text-[2.5rem] text-slategray">
          {props.word}
          {isOpen && closeButton}
        </h1>
        {props.phoneticSign && (
          <h2 className="relative ">
            <span className="mr-2 inline-block h-[0.6rem] w-[0.6rem] rounded-full bg-[#D964E3] align-middle leading-[1.2rem]">
              {" "}
            </span>
            <span className={`relative ${cycle.className} top-[1px]`}>
              {props.phoneticSign}
            </span>
          </h2>
        )}
        <p className={`relative ${cycle.className}`}>
          <span className="mr-2 inline-block h-[0.6rem] w-[0.6rem] rounded-full bg-[#f8f427] align-middle leading-[1.2rem]">
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
            <span
              // href={`/edit/${props.id}`}
              className="flex h-[1.8rem] w-[1.8rem]  cursor-pointer items-center justify-center rounded-full bg-[#6967ED]  text-[1rem] text-white shadow-lg hover:bg-light"
              onClick={deleteHandler}
            >
              <MdDelete></MdDelete>
            </span>
          </div>
        )}
      </div>
    </>
  );
};

export default Card;