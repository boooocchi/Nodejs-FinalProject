import "./globals.css";
import { Jomhuria, News_Cycle } from "@next/font/google";

// import { useAuth } from "../../utils/session";
import { getServerSession } from "next-auth";
import { authConfig } from "../../lib/auth";
import NavigationBar from "@/components/NavigationBar";
import { NextAuthProvider } from "./providers";
import SideMenu from "@/components/SideMenu";
import NewButton from "@/components/NewButton";
import { prisma } from "@/db";

const cycle = News_Cycle({
  subsets: ["latin"],
  weight: ["400"],
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
  children,
  params
}: {
  children: React.ReactNode;
  params: {
    newData: any;
  };
}) {
  const examples = await prisma.example.findMany();
  params.newData = examples;

  return (
    <html lang="en" className={`${cycle.variable}`}>
      <body className={`relative ${jomhuria.className}`}>
        <NextAuthProvider>
          <NavigationBar />
          <div className="flex justify-center">
            <SideMenu />
            <div className="w-full pl-[5rem] pr-[3.5rem]">{children}</div>
            <NewButton />
          </div>
        </NextAuthProvider>
      </body>
    </html>
  );
}
