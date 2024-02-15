import NextAuth from "next-auth";
import { authOptions } from "@/lib/oauth/authOptions";

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST}