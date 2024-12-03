import NextAuth, { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import prisma from "./db";
import bcrypt from "bcryptjs";

const config = {
  pages: {
    signIn: "/login",
  },
  session: {
    //for this duration user does not need to login again
    maxAge: 10 * 24 * 60 * 60,
    strategy: "jwt",
  },
  providers: [
    Credentials({
      async authorize(credentials) {
        //runs on login
        const { email, password } = credentials;
        const user = await prisma.user.findUnique({
          where: {
            email: email,
          },
        });
        if (!user) {
          console.log("No user found");
          return null;
        }

        const passwordMatch = await bcrypt.compare(
          password,
          user.hashedPassword
        );
        if (!passwordMatch) {
          console.log("password mismatch...");
          return null;
        }

        return user;
      },
    }),
  ], //email password, github , google
  callbacks: {
    //if the user is attempting to login we can add some logic here
    authorized: ({ auth, request }) => {
      //runs on request with middleware
      const isLoggedIn = Boolean(auth?.user);
      const isTryingToAccessApp = request.nextUrl.pathname.includes("/app");
      if (isLoggedIn && isTryingToAccessApp) return true;
      if (!isLoggedIn && isTryingToAccessApp) return false;
      if (isLoggedIn && !isTryingToAccessApp) return Response.redirect(new URL('/app/dashboard',request.nextUrl));
      if(!isLoggedIn && !isTryingToAccessApp) return true;
      return false;
    },
  },
} satisfies NextAuthConfig;

export const { auth, signIn, signOut } = NextAuth(config);
