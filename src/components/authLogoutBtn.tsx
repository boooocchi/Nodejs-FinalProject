"use client";
import { signOut } from "next-auth/react";
import { BiLogOutCircle } from "react-icons/bi";
import { useRouter } from "next/navigation";

export const AuthLogoutBtn = () => {
  const router = useRouter();

  const handleLogout = async () => {
    await signOut({ redirect: false });

    // Perform any additional logic after logout if needed
    router.refresh();
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
