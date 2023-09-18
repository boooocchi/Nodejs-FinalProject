import { prisma } from "@/db";
import React from "react";
import { News_Cycle } from "@next/font/google";
import { FaRegPaperPlane } from "react-icons/fa";
import { redirect } from "next/navigation";
import Link from "next/link";
import { BsArrowLeft } from "react-icons/bs";
import { FiEdit2 } from "react-icons/fi";
import { Jomhuria } from "@next/font/google";
import { authConfig } from "../../../lib/auth";
import { getServerSession } from "next-auth";

const jomhuria = Jomhuria({
  subsets: ["latin"],
  weight: ["400"]
});
const cycle = News_Cycle({
  subsets: ["latin"],
  weight: ["400"]
});

const New = async () => {
  const createEx = async (data: FormData) => {
    const session = await getServerSession(authConfig);
    const word = data.get("word")?.valueOf();
    const exSentence = data.get("exSentence")?.valueOf();
    const phoneticSign = data.get("phoneticSign")?.valueOf();
    const meaning = data.get("meaning")?.valueOf();

    if (typeof word !== "string" || word.length === 0) {
      throw new Error("invalid word");
    }
    if (typeof exSentence !== "string" || exSentence.length === 0) {
      throw new Error("invalid sentence");
    }
    if (typeof phoneticSign !== "string") {
      throw new Error("invalid phonetic sign");
    }
    if (typeof meaning !== "string") {
      throw new Error("invalid phonetic sign");
    }

    await prisma.example.create({
      data: {
        word,
        meaning,
        phoneticSign,
        exSentence,
        userId: session?.user?.id ?? ""
      }
    });

    redirect("/");
  };

  return (
    <div className="mx-auto mt-[8rem] flex w-[90%] justify-center">
      <Link href="/">
        <BsArrowLeft className="mt-[3rem] self-start text-[1.5rem] hover:text-light"></BsArrowLeft>
      </Link>
      <form
        className={`mx-auto mt-[3rem] flex h-[500px] max-w-[700px] flex-col items-center gap-5 md:w-4/5 ${cycle.className}`}
        action={createEx}
      >
        <div className="flex items-center justify-center ">
          <h1
            className={`text-center text-[3rem] text-blueblack ${jomhuria.className}`}
          >
            New
          </h1>
          <FiEdit2 className="relative bottom-1 ml-2 text-[1.3rem]"></FiEdit2>
        </div>
        <div className="flex w-full  gap-[2%]">
          <input
            placeholder="Word"
            className=" w-[49%] grow rounded-xl border-2 px-3 text-[1rem] leading-[2.5rem]"
            type="text"
            name="word"
          />

          <input
            placeholder="Phonetic sign"
            className="w-[49%] grow rounded-xl border-2 px-3 text-[1rem] "
            type="text"
            name="phoneticSign"
          />
        </div>
        <input
          placeholder="Meaning"
          className="w-full   rounded-xl border-2 px-3 text-[1rem] leading-[2.5rem]"
          type="text"
          name="meaning"
        />
        <textarea
          placeholder="Example senteces"
          className="h-40 w-full  rounded-xl  border-2 p-3 text-[1.1rem]"
          name="exSentence"
        ></textarea>
        <button
          type="submit"
          className={` grow-0 self-end rounded-lg  bg-rich px-3 py-2 leading-[1.2rem] text-white max-xs:flex max-xs:w-full max-xs:justify-center`}
        >
          <FaRegPaperPlane></FaRegPaperPlane>
        </button>
      </form>
    </div>
  );
};

export default New;
