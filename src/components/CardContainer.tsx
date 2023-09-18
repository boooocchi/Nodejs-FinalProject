"use client";
import React, { useContext, useEffect } from "react";
import Card from "./Card";
import { DataContext } from "@/app/dataProvider";

interface CardContainerProps {
  userId?: string;
}
const CardContainer: React.FC<CardContainerProps> = ({ userId }) => {
  const {
    data,
    isLoading,
    getExamples,
    getFavExamples,
    searched,
    setIsSearched
  } = useContext(DataContext);
  useEffect(() => {
    if (userId) {
      getFavExamples(userId);
      return;
    } else {
      getExamples();
    }
  }, []);
  return (
    <>
      {searched !== "" && (
        <div className="flex items-center mt-[2rem] ">
          <h2 className="font-cycle text-[1rem]">
            search keyword:{" "}
            <span className="text-[1.1rem] font-bold mr-3">{searched}</span>
          </h2>
          <button
            className="rounded-full bg-rich text-white h-5 w-5 flex items-center justify-center"
            onClick={() => {
              setIsSearched("");
              getExamples();
            }}
          >
            ×
          </button>
        </div>
      )}
      {isLoading && (
        <div className="mt-[3rem] flex w-full justify-center">
          <div className="relative flex h-[2.5rem] w-[8rem]">
            <span className="absolute left-[15%] top-[18%] inline-flex h-[70%] w-[70%]  animate-ping rounded-full bg-rich opacity-75"></span>
            <span className="relative flex h-[2.5rem] w-[8rem] items-center justify-center rounded-full  bg-light text-[1.6rem] leading-[2.5rem] text-white shadow-md">
              <span className="relative top-[2px]">Loading</span>
            </span>
          </div>
        </div>
      )}
      <div className=" mt-[2rem] grid grid-cols-3 gap-5 max-lg:grid-cols-2 max-md:grid-cols-2 max-xs:grid-cols-1 xl:grid-cols-4">
        {!isLoading &&
          data &&
          data.map((row: any) => {
            return <Card {...row}></Card>;
          })}
      </div>
      {!isLoading && data?.length === 0 && (
        <div className="mt-[3rem] flex w-full flex-col  items-center justify-center gap-4 font-cycle">
          <span>No matching result</span>
          <span
            className="cursor-pointer rounded-full bg-rich px-4 py-2 text-white  hover:bg-light"
            onClick={() => getExamples()}
          >
            <span className="relative bottom-[1px]">← back to all</span>
          </span>
        </div>
      )}
    </>
  );
};

export default CardContainer;
