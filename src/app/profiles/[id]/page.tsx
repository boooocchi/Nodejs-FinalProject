import { getServerSession } from "next-auth";
import React from "react";
import Card from "@/components/Card";
import { prisma } from "@/db";

const ProfilePage = async ({ params }: any) => {
  const { id } = params;

  const session = await getServerSession();
  const imageSrc = session?.user?.image ?? "";
  const examples = await prisma.example.findMany({
    where: { userId: id },
    include: {
      favorite: true
    }
  });
  return (
    <>
      <div className="flex flex-col items-center justify-center">
        <div className="absolute left-[-80px] top-[0px] h-0 w-0 border-b-[24px] border-l-[15px] border-t-[24px] border-b-transparent border-l-light border-t-transparent"></div>

        <div className="mt-[8rem]   overflow-hidden rounded-full border-[3px] border-accent  text-[5rem] shadow-md">
          <div className="  overflow-hidden rounded-full border-[5px] border-white  text-[5rem] shadow-md">
            <img
              src={imageSrc}
              alt="profile image"
              className="h-[6.5rem] w-[6.5rem] rounded-full border border-gray-200"
            />
          </div>
        </div>
        <h1 className="mt-5 text-[3rem] leading-[2rem] text-blueblack">
          {session?.user?.name}
        </h1>
        <h2 className="font-cycle text-[1rem] leading-[1.3rem] text-blueblack">
          {session?.user?.email}
        </h2>
      </div>
      {examples.length !== 0 && (
        <div className="relative mt-[3rem] grid grid-cols-3 gap-5 max-lg:grid-cols-2 max-md:grid-cols-2 xl:grid-cols-4">
          {examples?.map((example) => {
            return <Card {...example}></Card>;
          })}
        </div>
      )}
      {examples.length === 0 && (
        <div className="mt-[3rem] flex w-full flex-col  items-center justify-center gap-4 font-cycle">
          <span className="text-[1.2rem]">You don't have any examples yet</span>
        </div>
      )}
    </>
  );
};

export default ProfilePage;
