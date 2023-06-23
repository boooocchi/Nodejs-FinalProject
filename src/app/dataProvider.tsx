"use client";
import { useState } from "react";
import { createContext } from "react";

export const DataContext = createContext({
  searchExamples: (keyword: string | null) => {},
  getExamples: () => {},
  data: null
});

export default function DataProvider({
  children
}: {
  children: React.ReactNode;
}) {
  const [examples, setExamples] = useState(null);
  const searchHandler = async (keyword: string | null) => {
    console.log(keyword);
    const res = await fetch(`/api/data?keyword=${keyword}`, {
      method: "POST",
      body: JSON.stringify({ keyword: keyword })
    });
    const data = await res.json();

    setExamples(data);
  };
  const getHandler = async () => {
    const res = await fetch("/api/data", {
      method: "GET"
    });
    const data = await res.json();
    setExamples(data);
  };
  return (
    <DataContext.Provider
      value={{
        searchExamples: searchHandler,
        getExamples: getHandler,
        data: examples
      }}
    >
      {children}
    </DataContext.Provider>
  );
}
