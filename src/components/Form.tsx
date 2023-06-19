"use client";
import Link from "next/link";
import React from "react";
Link;
import { FaRegPaperPlane } from "react-icons/fa";

import { FiEdit2 } from "react-icons/fi";
import { BsArrowLeft } from "react-icons/bs";
import { Jomhuria } from "@next/font/google";
import { News_Cycle } from "@next/font/google";
import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
// import { updateEx } from "../updateEx";
// Form.tsx

interface FormProps {
  example: {
    id: string;
    userId: string;
    createdAt: Date;
    word: string;
    phoneticSign: string | null;
    exSentence: string;
  } | null;
}

const cycle = News_Cycle({
  subsets: ["latin"],
  weight: ["400"]
});
const jomhuria = Jomhuria({
  subsets: ["latin"],
  weight: ["400"]
});
const Form: React.FC<FormProps & React.HTMLAttributes<HTMLFormElement>> = ({
  example
}) => {
  const router = useRouter();
  const wordRef = useRef(null);
  const signRef = useRef(null);
  const exRef = useRef(null);

  const [values, setValues] = useState({
    word: example?.word,
    phoneticSign: example?.phoneticSign || "",
    exSentence: example?.exSentence
  });

  const valueHandler = (e: any) => {
    const { name, value } = e.target;
    setValues((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const updateHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = { ...values, id: example?.id };
    fetch(`/api/example`, {
      method: "POST",
      body: JSON.stringify(data)
    })
      .then((response) => {
        if (response.ok) {
          console.log("Ex edited successfully");
        } else {
          console.error("Failed to edit");
        }
      })
      .catch((error) => {
        console.error("Network error:", error);
      });
    // router.push("/");
  };

  return (
    <form
      className={`mx-auto mt-[8rem]  flex h-[500px] w-4/5 flex-col gap-5 ${cycle.className}`}
      onSubmit={updateHandler}
    >
      <Link href="/">
        <BsArrowLeft className="text-[1.5rem] hover:text-light"></BsArrowLeft>
      </Link>
      <div className="flex items-center justify-center">
        <h1
          className={`text-center text-[3rem] text-blueblack ${jomhuria.className}`}
        >
          Edit
        </h1>
        <FiEdit2 className="relative bottom-1 ml-2 text-[1.3rem]"></FiEdit2>
      </div>

      <div className="flex gap-5">
        <input
          placeholder="Word"
          className="grow rounded-xl border-2 px-3 text-[1rem] leading-[2.5rem]"
          type="text"
          name="word"
          value={values.word}
          ref={wordRef}
          onChange={valueHandler}
        />

        <input
          placeholder="Phonetic sign"
          className="grow rounded-xl border-2 px-3 text-[1rem] leading-[2.5rem]"
          type="text"
          name="phoneticSign"
          value={values.phoneticSign}
          ref={signRef}
          onChange={valueHandler}
        />
      </div>
      <textarea
        placeholder="Example senteces"
        className="h-[15rem] rounded-xl border-2 p-3  text-[1.1rem]"
        name="exSentence"
        id=""
        ref={exRef}
        onChange={valueHandler}
        value={values.exSentence}
      ></textarea>
      <button
        type="submit"
        className={`grow-0 self-end rounded-lg bg-rich  px-3 py-2 leading-[1.2rem] text-white hover:bg-light`}
      >
        <FaRegPaperPlane></FaRegPaperPlane>
      </button>
    </form>
  );
};

export default Form;
