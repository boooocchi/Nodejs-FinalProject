import { getServerSession } from "next-auth";
import React from "react";
import Card from "@/components/Card";
import { prisma } from "@/db";

const ProfilePage = async ({ params }: any) => {
  const { id } = params;

  const session = await getServerSession();
  const profileImage = session?.user?.image ? (
    <img
      src={session.user.image}
      alt="profile image"
      className="h-[6.5rem] w-[6.5rem] rounded-full border border-gray-200"
    />
  ) : (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="#555"
      className="w-[6.5rem] h-[6.5rem]"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
      />
    </svg>
  );
  const examples = await prisma.example.findMany({
    where: { userId: id },
    include: {
      favorite: true
    }
  });
  return (
    <>
      <div className="flex flex-col items-center justify-center">
        <div className="mt-[8rem]   overflow-hidden rounded-full border-[3px] border-accent  text-[5rem] shadow-md">
          <div className="z-99 fixed left-[240px] top-[248px] h-0 w-0 border-b-[24px] border-l-[15px] border-t-[24px] border-b-transparent border-l-light border-t-transparent max-md:hidden"></div>
          <div className="overflow-hidden rounded-full border-[5px] border-white  text-[5rem] shadow-md">
            {profileImage}
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
