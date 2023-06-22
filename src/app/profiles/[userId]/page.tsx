import { getServerSession } from "next-auth";
import React from "react";

const ProfilePage = async () => {
  const user = await getServerSession();
  console.log(user);
  return <div className="text-[5rem]"></div>;
};

export default ProfilePage;
