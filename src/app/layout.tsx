import "./globals.css";
import { Jomhuria } from "@next/font/google";
import Link from "next/link";
import logo from "../../public/logo.png";
import Image from "next/image";

const jomhuria = Jomhuria({
  subsets: ["latin"],
  weight: ["400"]
});
export const metadata = {
  title: "Share your example sentence",
  description:
    "Website where you can share words and example sentence of them with al the English learner out there"
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`relative ${jomhuria.className}`}>
        <header className="fixed top-0 h-[4.5rem] w-full bg-gray-100 shadow-md"></header>
        <div className="flex">
          <div className="relative h-screen w-[17rem] bg-[#8b89e9f6]">
            <div className="absolute left-0 top-0 flex h-[4.5rem] w-full items-center justify-center bg-[#6967ED] text-[3rem] text-white">
              <span className="relative top-1 flex items-center tracking-wide ">
                Sharex.{" "}
                <Image className="mb-1 ml-1 h-9 w-9" src={logo} alt="" />
              </span>
            </div>
            <ul className="absolute left-[3rem] top-[7rem] flex flex-col gap-5 text-[2.3rem] text-white">
              <li>
                <Link href="">Feed</Link>
              </li>
              <li>
                <Link href="">Mine</Link>
              </li>
              <li>
                <Link href="">Account</Link>
              </li>
            </ul>
          </div>
          <div className="w-full px-[5rem]">{children}</div>
          <Link
            href="/new"
            className="absolute bottom-[5%] right-[3%]  flex h-12 w-12 cursor-pointer items-center justify-center rounded-full bg-[#6967ED] text-[2.5rem] font-light text-white shadow-lg hover:bg-light"
          >
            <span className=" relative top-[2px]">+</span>
          </Link>
        </div>
      </body>
    </html>
  );
}
