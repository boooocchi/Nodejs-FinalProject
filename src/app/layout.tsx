import "./globals.css";
import { Jomhuria, News_Cycle } from "@next/font/google";
import Link from "next/link";
import logo from "../../public/logo.png";
import Image from "next/image";
import { GoogleSignInButton } from "@/components/authButton";
import { AuthLogoutBtn } from "@/components/authLogoutBtn";
import { CiSearch } from "react-icons/ci";
// import { useAuth } from "../../utils/session";
import { getServerSession } from "next-auth";
import { authConfig } from "../../lib/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/db";

const cycle = News_Cycle({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-cycle"
});
const jomhuria = Jomhuria({
  subsets: ["latin"],
  weight: ["400"]
});
export const metadata = {
  title: "Share your example sentence",
  description:
    "Website where you can share words and example sentence of them with al the English learner out there"
};

export default async function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authConfig);

  const searchEx = async (data: FormData) => {
    "use server";
    const word = data.get("word")?.valueOf();

    redirect(`/searchresult/${word}`);
  };
  const accountHandler = async () => {
    "use server";
    const user = await prisma.user.findUnique({
      where: { email: session?.user?.email || undefined }
    });
    redirect(`/profiles/${user?.id}`);
  };
  return (
    <html lang="en" className={`${cycle.variable}`}>
      <body className={`relative ${jomhuria.className}`}>
        <header className="fixed top-0 z-[99] flex h-[4.5rem] w-full items-center  bg-gray-100 pr-[3rem] shadow-md">
          <ul className="flex w-full items-center justify-between">
            <div className="relative left-0 flex h-[4.5rem] min-w-[15rem] items-center justify-center bg-[#6967ED] text-[3rem] text-white">
              <span className="relative top-1 flex items-center tracking-wide">
                <span className="drop-shadow-md">Sharex. </span>
                <Image className="mb-1 ml-1 h-9 w-9" src={logo} alt="" />
              </span>
            </div>
            <form className="ml-[5rem] flex items-center" action={searchEx}>
              <input
                className="h-10 w-[15rem] rounded-full bg-white px-4 font-cycle text-[.9rem] shadow-sm"
                type="text"
                placeholder="Search Ex."
                name="word"
              />
              <button
                className="ml-[-2.4rem] flex h-[2rem] w-[2rem]  items-center justify-center rounded-full bg-rich py-1 text-[1.3rem] text-white hover:bg-light"
                type="submit"
              >
                <CiSearch></CiSearch>
              </button>
            </form>
            {session?.user?.image ? (
              <div className="group ml-auto flex cursor-pointer items-center rounded-full bg-accent py-1 pl-2 pr-4 shadow-md hover:bg-white">
                <img
                  src={session.user?.image}
                  alt=""
                  className="h-10 w-10 rounded-full "
                />
                <span className="relative bottom-[2px] ml-2 font-cycle text-[0.9rem] text-white drop-shadow-md group-hover:text-accent group-hover:drop-shadow-none">
                  Hello, {session.user?.name?.split(" ")[0]}
                </span>
              </div>
            ) : (
              <GoogleSignInButton></GoogleSignInButton>
            )}
          </ul>
        </header>
        <div className="flex justify-center">
          <div className="relative z-[97] h-full min-h-screen w-[15rem] min-w-[15rem] bg-light ">
            <ul className="absolute left-0 top-[7rem] flex w-full flex-col gap-5 text-[2.3rem] text-white">
              <Link
                href="/"
                className="transition-color group relative flex h-[3rem] w-full items-center duration-200 hover:bg-rich"
              >
                <span className="ml-[3.5rem] mt-[10px] inline-block drop-shadow-md">
                  Feed
                </span>
                <div
                  className="group-hover:opacity-1  absolute right-0 top-0
  h-0 w-0
  translate-x-[100%] border-b-[24px] border-l-[15px]  border-t-[24px] border-b-transparent border-l-transparent border-t-transparent transition duration-200 group-hover:border-l-rich"
                ></div>
              </Link>
              <Link
                href="/"
                className="flex h-[3rem] w-full items-center hover:bg-rich"
              >
                <span className="ml-[3.5rem] mt-[10px] inline-block drop-shadow-md">
                  Mine
                </span>
              </Link>
              <div className="flex h-[3rem] w-full items-center hover:bg-rich">
                <span className="ml-[3.5rem] mt-[10px] inline-block drop-shadow-md">
                  Account
                </span>
              </div>
              {session?.user && <AuthLogoutBtn></AuthLogoutBtn>}
            </ul>
          </div>
          <div className="w-full pl-[5rem] pr-[3.5rem]">{children}</div>
          {session?.user && (
            <Link
              href="/new"
              className="absolute bottom-[5%] right-[3%]  flex h-12 w-12 cursor-pointer items-center justify-center rounded-full bg-[#6967ED] text-[2.5rem] font-light text-white shadow-lg hover:bg-light"
            >
              <span className=" relative top-[2px]">+</span>
            </Link>
          )}
        </div>
      </body>
    </html>
  );
}
