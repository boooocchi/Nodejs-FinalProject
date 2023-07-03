"use client";
import { DataContext } from "@/app/dataProvider";
import React, { useRef, useContext, useState } from "react";
import { CiSearch } from "react-icons/ci";

const SearchInput = () => {
  const [inputValue, setInputValue] = useState("");
  const keywordRef = useRef<HTMLInputElement>(null);
  const { searchExamples } = useContext(DataContext);
  console.log(searchExamples);
  const searchEx = (e: any) => {
    e.preventDefault();
    const keyword = keywordRef?.current?.value || "";
    console.log(keyword);
    searchExamples(keyword);
    setInputValue("");
  };
  const onChangeHandler = () => {
    setInputValue(keywordRef?.current?.value || "");
  };
  return (
    <form className="ml-[5rem] flex items-center" onSubmit={searchEx}>
      <input
        className="h-10 w-[15rem] rounded-full bg-white px-4 font-cycle text-[.9rem] shadow-sm"
        type="text"
        placeholder="Search Ex."
        name="keyword"
        ref={keywordRef}
        value={inputValue}
        onChange={onChangeHandler}
      />
      <button className="ml-[-2.4rem] flex h-[2rem] w-[2rem]  items-center justify-center rounded-full bg-rich py-1 text-[1.3rem] text-white hover:bg-light">
        <CiSearch></CiSearch>
      </button>
    </form>
  );
};

export default SearchInput;
