"use client";
import { useState } from "react";
import { createContext } from "react";

export const DataContext = createContext<{
  searchExamples: (keyword: string | "") => void;
  getExamples: (sortKeyword?: string, sortMethod?: string) => void;
  getFavExamples: (keyword: string | "") => void;
  data: Example[];
  isLoading: boolean;
  searched: string;
  setIsSearched: React.Dispatch<React.SetStateAction<string>>;
}>({
  searchExamples: () => {},
  getExamples: () => {},
  getFavExamples: () => {},
  data: [],
  isLoading: true,
  searched: "",
  setIsSearched: () => {}
});
type Example = {
  id: string;
  userId: string;
  createdAt: string;
  word: string;
  phoneticSign?: string;
  exSentence: string;
  favorite: { userId: string; exampleId: string }[]; // Define the type for favorite array
};

export default function DataProvider({
  children
}: {
  children: React.ReactNode;
}) {
  const [examples, setExamples] = useState<Example[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSearched, setIsSearched] = useState("");
  const searchHandler = async (keyword: string | "") => {
    setIsLoading(true);

    if (keyword === "") {
      const res = await fetch("/api/data", {
        method: "GET"
      });
      const data = await res.json();
      setExamples(data);
      setIsSearched("");
      setIsLoading(false);
      return;
    }

    const res = await fetch(`/api/data?keyword=${keyword}`, {
      method: "POST",
      body: JSON.stringify({ keyword: keyword })
    });
    const data = await res.json();

    setExamples(data);
    keyword && setIsSearched(keyword);
    setIsLoading(false);
  };
  const getHandler = async (sortKeyword?: string, sortOrder?: string) => {
    let res;
    if (!sortKeyword) {
      res = await fetch("/api/data", {
        method: "GET"
      });
    } else {
      res = await fetch("/api/sort", {
        method: "POST",
        body: JSON.stringify({ method: sortKeyword, order: sortOrder })
      });
    }
    const data = await res.json();
    setExamples(data);
    setIsSearched("");
    setIsLoading(false);
  };
  const getFavHandler = async (userId: string | "") => {
    setIsLoading(true);

    const res = await fetch("/api/data", {
      method: "GET"
    });
    const data = await res.json();

    const filteredData = data.filter(
      (item: any) => item.favorite?.some((fav: any) => fav.userId === userId)
    );
    setExamples(filteredData);

    setIsLoading(false);
  };

  return (
    <DataContext.Provider
      value={{
        searchExamples: searchHandler,
        getExamples: getHandler,
        getFavExamples: getFavHandler,
        data: examples,
        isLoading: isLoading,
        searched: isSearched,
        setIsSearched
      }}
    >
      {children}
    </DataContext.Provider>
  );
}
