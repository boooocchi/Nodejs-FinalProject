// import { NextAuthOptions, User, getServerSession } from "next-auth";
// import CredentialsProviders from "next-auth/providers/credentials";
// import GoogleProvider from "next-auth/providers/google";
// import { prisma } from "@/db";

// export const authConfig: NextAuthOptions = {
//   providers: [
//     GoogleProvider({
//       clientId: process.env.GOOGLE_CLIENT_ID as string,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
//     })
//   ],
//   callbacks: {
//     session: ({ session, token }) => {
//       return {
//         ...session,
//         user: {
//           ...session.user,
//           id: token.id,
//         }
//       }
//     },
//   },
// };

import { prisma } from "@/db";
import type { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export const authConfig: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string
    })
  ],
  callbacks: {
    session: async ({ session, token }) => {
      //check in db if user exists in the db
      //if yes, return the user.id
      //else create a new user
      //return the user.id
      let userId;
      const user = await prisma.user.findUnique({
        where: { email: session?.user?.email || undefined }
      });
      if (user) {
        userId = user.id;
      }
      if (!user) {
        const userData = await prisma.user.create({
          data: {
            name: session.user?.name || "",
            email: session.user?.email || "",
            password: ""
          }
        });
        userId = userData.id;
      }
      return {
        ...session,
        user: {
          ...session.user,
          id: userId
        }
      };
    }
  }
};
