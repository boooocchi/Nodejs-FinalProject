import Link from "next/link";
import { getServerSession } from "next-auth";
import { authConfig } from "../../lib/auth";

export default async function NewButton() {
  const session = await getServerSession(authConfig);

  return session?.user ? (
    <Link
      as={"/new"}
      href="/new"
      className="absolute bottom-[5%] right-[3%]  flex h-12 w-12 cursor-pointer items-center justify-center rounded-full bg-[#6967ED] text-[2.5rem] font-light text-white shadow-lg hover:bg-light"
    >
      <span className=" relative top-[2px]">+</span>
    </Link>
  ) : null;
}