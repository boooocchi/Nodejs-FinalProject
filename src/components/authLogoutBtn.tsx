"use client";
import { signOut } from "next-auth/react";
import { BiLogOutCircle } from "react-icons/bi";

export const AuthLogoutBtn = () => {
  const handleLogout = async () => {
    await signOut({ redirect: false });
    // Perform any additional logic after logout if needed
  };
  return (
    <div
      className="z-[100] ml-[3.5rem] mt-[1rem] cursor-pointer text-[1.6rem] text-white drop-shadow-md "
      onClick={handleLogout}
    >
      <BiLogOutCircle
        className="hover:text-rich"
        onClick={handleLogout}
      ></BiLogOutCircle>
    </div>
  );
};
