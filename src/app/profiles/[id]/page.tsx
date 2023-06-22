import { getServerSession } from "next-auth";
import React from "react";
import Card from "@/components/Card";
import { prisma } from "@/db";

const ProfilePage = async () => {
  const session = await getServerSession();
  const imageSrc = session?.user?.image ?? "";
  const examples = await prisma.example.findMany({
    where: { userId: session?.user?.id }
  });
  return (
    <>
      <div className="flex flex-col items-center justify-center">
        <div className="mt-[8rem]   overflow-hidden rounded-full border-[3px] border-accent  text-[5rem] shadow-md">
          <div className="  overflow-hidden rounded-full border-[5px] border-white  text-[5rem] shadow-md">
            <img
              src={imageSrc}
              alt="profile image"
              className="h-32 w-32 rounded-full border border-gray-200"
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
      <div className="relative mt-[3rem] grid grid-cols-3 gap-5 max-lg:grid-cols-2 max-md:grid-cols-2 xl:grid-cols-4">
        {examples.map((example) => {
          return <Card {...example}></Card>;
        })}
      </div>
    </>
  );
};

export default ProfilePage;
