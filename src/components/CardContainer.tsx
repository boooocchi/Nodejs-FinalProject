"use client";
import React, { useContext, useEffect } from "react";
import Card from "./Card";
import { DataContext } from "@/app/dataProvider";
const CardContainer = () => {
  const { data, getExamples } = useContext(DataContext);

  // useEffect(() => {
  //   if (!data) getExamples();
  // }, []);
  return (
    <div className="relative mt-[3rem] grid grid-cols-3 gap-5 max-lg:grid-cols-2 max-md:grid-cols-2 xl:grid-cols-4">
      {data?.map((row: any) => {
        return <Card {...row}></Card>;
      })}
    </div>
  );
};

export default CardContainer;
