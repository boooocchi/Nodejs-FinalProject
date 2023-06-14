import { prisma } from "@/db";
import React from "react";
import { News_Cycle } from "@next/font/google";
import { FaRegPaperPlane } from "react-icons/fa";
import { redirect } from "next/navigation";

const cycle = News_Cycle({
  subsets: ["latin"],
  weight: ["400"]
});
const page = () => {
  const createEx = async (data: FormData) => {
    "use server";

    const word = data.get("word")?.valueOf();
    const exSentence = data.get("exSentence")?.valueOf();
    const phoneticSign = data.get("phoneticSign")?.valueOf();

    if (typeof word !== "string" || word.length === 0) {
      throw new Error("invalid word");
    }
    if (typeof exSentence !== "string" || exSentence.length === 0) {
      throw new Error("invalid sentence");
    }
    if (typeof phoneticSign !== "string") {
      throw new Error("invalid phonetic sign");
    }

    await prisma.example.create({
      data: {
        word,
        phoneticSign,
        exSentence,
        userId: "2b80569f-4df1-42b5-8d1e-fd985d2a2aa0"
      }
    });

    redirect("/");
  };
  return (
    <form
      className={`mx-auto mt-[8rem]  flex h-[500px] w-4/5 flex-col gap-5 ${cycle.className}`}
      action={createEx}
    >
      <div className="flex gap-5">
        <input
          placeholder="Word"
          className="grow rounded-xl border-2 px-3 text-[1rem] leading-[2.5rem]"
          type="text"
          name="word"
        />

        <input
          placeholder="Phonetic sign"
          className="grow rounded-xl border-2 px-3 text-[1rem] leading-[2.5rem]"
          type="text"
          name="phoneticSign"
        />
      </div>
      <textarea
        placeholder="Example senteces"
        className="h-40 rounded-xl border-2 p-3  text-[1.1rem]"
        name="exSentence"
        id=""
      ></textarea>
      <button
        type="submit"
        className={`grow-0 self-end rounded-lg bg-rich  px-3 py-2 leading-[1.2rem] text-white`}
      >
        <FaRegPaperPlane></FaRegPaperPlane>
      </button>
    </form>
  );
};

export default page;
