"use client";

import React, { useEffect, useState, useContext } from "react";
import { News_Cycle } from "@next/font/google";
import { FiEdit2 } from "react-icons/fi";
import { MdFavorite, MdDelete } from "react-icons/md";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { DataContext } from "@/app/dataProvider";

const cycle = News_Cycle({
  subsets: ["latin"],
  weight: ["400"]
});
interface Favorite {
  userId: string;
  exampleId: string;
}

const Card: React.FC<{
  id: string;
  userId: string;
  createdAt: Date;
  word: string;
  meaning: string;
  phoneticSign: string | null;
  exSentence: string;
  favorite?: Favorite[];
}> = (props) => {
  const { getExamples, getFavExamples } = useContext(DataContext);
  const session = useSession();

  const [isOpen, setIsOpen] = useState(false);
  const [addedFavorite, setAddedFavorite] = useState(null);
  const cardClass = isOpen
    ? "fixed border-gray flex h-[27rem] w-[22rem] flex-col gap-2 rounded-xl border bg-white px-7 py-7 shadow-md  left-1/2 transform -translate-x-1/2 md:-translate-x-[6%] top-[23%]  z-10 hover:bottom-1 "
    : "border-gray flex h-[15rem] flex-col gap-2 rounded-xl border bg-white px-7 py-7 shadow-md  hover:scale-105  overflow-hidden transform duration-200";
  const openHandler = () => {
    setIsOpen(true);
  };

  const closeButton = (
    <div
      className="z-99 absolute right-[-22%] top-[-125%] flex h-[1.8rem] w-[1.8rem] cursor-pointer items-center justify-center rounded-full text-white hover:bg-[#6967ED] hover:shadow-md"
      onClick={(e) => {
        e.stopPropagation();
        setIsOpen(false);
      }}
    >
      <span className="relative top-[2px] text-[2.2rem]">×</span>
    </div>
  );
  const deleteHandler = async () => {
    fetch(`/api/example?id=${props.id}`, {
      method: "DELETE",
      next: { revalidate: 0 }
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
      })
      .finally(() => {
        getExamples();
        setTimeout(() => {
          setIsOpen(false);
        }, 500);
      });
  };

  const favoriteHandler = async () => {
    const data = { exampleId: props.id, userId: session?.data?.user?.id };
    const existingFavorite = await fetch("/api/favorite", {
      method: "POST",
      body: JSON.stringify(data)
    });
    const { addedFavorite } = await existingFavorite.json();

    setAddedFavorite(addedFavorite);
  };

  let heartClass;
  const favoriteArr = props.favorite?.filter((row) => {
    return row?.userId === session.data?.user?.id;
  });
  if (addedFavorite === null) {
    heartClass = favoriteArr?.length !== 0 ? "text-accent" : "text-white";
  } else {
    heartClass = addedFavorite ? "text-accent" : "text-white";
  }

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 z-10  bg-[rgba(1,1,1,0.3)]"
          onClick={() => setIsOpen(false)}
        ></div>
      )}
      <div className={cardClass} onClick={openHandler}>
        <h1 className="relative text-center  text-[2.6rem] leading-[2rem] text-slategray">
          {props.word}
          {isOpen && closeButton}
        </h1>

        <h2 className="relative mt-5">
          <span className="mr-2 inline-block h-[0.6rem] w-[0.6rem] rounded-full bg-[#D964E3] align-middle leading-[1.2rem]">
            {" "}
          </span>
          <span className={`relative ${cycle.className} top-[1px]`}>
            {props.phoneticSign}
          </span>
        </h2>
        <h2 className="relative ">
          <span className="mr-2 inline-block h-[0.6rem] w-[0.6rem] rounded-full bg-[#f8f427] align-middle leading-[1.2rem]">
            {" "}
          </span>
          <span
            className={`relative ${cycle.className} top-[1px] leading-[.9rem]`}
          >
            {props.meaning}
          </span>
        </h2>

        {isOpen && (
          <>
            <div className={`relative mb-5 mt-7`}>
              <h3 className=" text-[2rem] font-[400] leading-[1rem] tracking-normal  text-slategray">
                &nbsp;Ex. sentences
              </h3>
              {props.exSentence.split("\n").map((line, num) => {
                return (
                  <div key={num} className="mt-2 font-cycle">
                    <span className="mr-2  inline-block h-[0.6rem] w-[0.6rem] rounded-full bg-[#55cfe7] align-middle leading-[1.5rem]">
                      {" "}
                    </span>

                    <span className="relative top-[1px] ">{line}</span>
                    <br></br>
                  </div>
                );
              })}
            </div>
            <div className="mt-auto flex gap-2 self-end">
              {session.status === "authenticated" && (
                <span
                  className="flex h-[1.8rem] w-[1.8rem]  cursor-pointer items-center justify-center rounded-full bg-[#6967ED]  text-[1rem]  shadow-lg hover:bg-light"
                  onClick={favoriteHandler}
                >
                  {}
                  <MdFavorite className={heartClass}></MdFavorite>
                </span>
              )}

              {session?.data?.user?.id === props.userId && (
                <Link
                  // href={`/edit/${props.id}`}
                  className="flex h-[1.8rem] w-[1.8rem]  cursor-pointer items-center justify-center rounded-full bg-[#6967ED]  text-[1rem] text-white shadow-lg hover:bg-light"
                  href={`/edit/${props.id}`}
                >
                  <FiEdit2></FiEdit2>
                </Link>
              )}

              {session?.data?.user?.id === props.userId && (
                <span
                  // href={`/edit/${props.id}`}
                  className="flex h-[1.8rem] w-[1.8rem]  cursor-pointer items-center justify-center rounded-full bg-[#6967ED]  text-[1rem] text-white shadow-lg hover:bg-light"
                  onClick={deleteHandler}
                >
                  <MdDelete></MdDelete>
                </span>
              )}
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Card;
