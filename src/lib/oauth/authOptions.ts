import { Account } from "next-auth";
import type { Adapter } from "next-auth/adapters";
import GithubProvider from "next-auth/providers/github";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "@/lib/prisma";
import { JWT } from "next-auth/jwt";

export const authOptions = {
  adapter: PrismaAdapter(prisma) as Adapter,
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
      // authorization: {
      //   params: {
      //     prompt: "consent",
      //   },
      // },
    }),
  ],
  callbacks: {
    async jwt({token, account}: { token: JWT, account: Account | null}) {
      if (account) {
        token.id = account.id;
      }

      return token;
    },
    async session({ session, token, user }: {session: any, token: JWT, user: any }) {
      if (user) {
        session.user.id = user.id;
      }
      return session;
    }
  }
  
}