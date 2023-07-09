import "./globals.css";
import { Jomhuria, News_Cycle } from "@next/font/google";

import NavigationBar from "@/components/NavigationBar";
import { NextAuthProvider } from "./providers";
import SideMenu from "@/components/SideMenu";
import NewButton from "@/components/NewButton";
import { prisma } from "@/db";
import DataProvider from "./dataProvider";

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
    <html lang="en" className={`${cycle.variable} min-w-[330px]`}>
     
      <body className={`relative ${jomhuria.className}`}>
        <NextAuthProvider>
          <DataProvider>
            <NavigationBar />
            <div className="flex min-h-screen  justify-center">
              <SideMenu />
              <div className="relative mb-[3rem] w-full px-[3.5rem] max-xs:px-[1.5rem] md:ml-[15rem]">
                {children}
              </div>
              <NewButton />
            </div>
          </DataProvider>
        </NextAuthProvider>
      </body>
    </html>
  );
}
