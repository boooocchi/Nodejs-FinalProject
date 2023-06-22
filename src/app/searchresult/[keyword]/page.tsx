import React from "react";
import { prisma } from "@/db";
import Card from "@/components/Card";
interface PageProps {
  params: any;
}
const SearchResult = async ({ params }: PageProps) => {
  console.log(params.keyword);
  const searchedExamples = await prisma.example.findMany({
    where: { word: { contains: params.keyword } }
  });
  console.log(searchedExamples);

  return (
    <>
      <div className="mt-[7rem] font-cycle">
        ...search result with{" "}
        <span className="text-[1.1rem] font-[700]"> "{params.keyword}"</span>
      </div>
      <div className="relative mt-[2rem] grid grid-cols-3 gap-5 max-lg:grid-cols-2 max-md:grid-cols-2 xl:grid-cols-4">
        {searchedExamples.map((searchedExample) => {
          return <Card {...searchedExample}></Card>;
        })}
      </div>
    </>
  );
};

export default SearchResult;
