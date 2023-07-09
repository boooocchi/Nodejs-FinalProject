"use client";
import React, { useContext, useState } from "react";

import { DataContext } from "@/app/dataProvider";
import { spawn } from "child_process";
import { FaGlasses } from "react-icons/fa";

interface DataSortButtonProps {
  children: React.ReactNode;
  sortKeyword: string;
}

const DataSortButton: React.FC<DataSortButtonProps> = ({
  children,
  sortKeyword
}) => {
  const { getExamples } = useContext(DataContext);
  const [sortMethod, setSortMethod] = useState(false);
  const [isClicked, setIsClicked] = useState(false);

  const sortHandler = (sortKeyword: string) => {
    setIsClicked(true);
    let sortOrder;
    setSortMethod((prev) => !prev);
    if (sortMethod) {
      sortOrder = "asc";
    } else {
      sortOrder = "desc";
    }
    getExamples(sortKeyword, sortOrder);
  };
  return (
    <button
      onClick={() => sortHandler(sortKeyword)}
      className="rounded-full border border-rich px-3 py-1 text-center font-cycle text-[.9rem] hover:bg-rich hover:text-white"
    >
      <span className="">
        {children}
        {isClicked && <>{sortMethod ? <span>↑</span> : <span>↓</span>}</>}
      </span>
    </button>
  );
};

export default DataSortButton;
