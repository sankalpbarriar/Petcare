import NextAuth, { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { getUserByEmail } from "./server-utils";
import { authSchema } from "./validations";
import { sleep } from "./utils";

const config = {
  pages: {
    signIn: "/login",
  },
  session: {
    //for this duration user does not need to login again
    maxAge: 1 * 24 * 60 * 60,
    strategy: "jwt",
  },
  providers: [
    Credentials({
      async authorize(credentials) {
        //runs on login

        //validation
        const validatedFormData = authSchema.safeParse(credentials);
        if (!validatedFormData.success) {
          return null;
        }

        //extract values
        const { email, password } = validatedFormData.data;

        const user = await getUserByEmail(email);
        if (!user) {
          console.log("No user found");
          return null;
        }

        const passwordMatch = await bcrypt.compare(
          password,
          user.hashedPassword
        );
        if (!passwordMatch) {
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

      if (!isLoggedIn && isTryingToAccessApp) return false;

      if (isLoggedIn && isTryingToAccessApp && !auth?.user.hasAccess) {
        return Response.redirect(new URL("/payment", request.nextUrl));
      }

      if (isLoggedIn && isTryingToAccessApp && auth?.user.hasAccess) {
        return true;
      }

      if(isLoggedIn && (
        request.nextUrl.pathname.includes("/login") ||
        request.nextUrl.pathname.includes("/sign-up")) && auth?.user.hasAccess
      ){
        return Response.redirect(new URL('/app/dashboard', request.nextUrl))
      }

      if (isLoggedIn && !isTryingToAccessApp && !auth?.user.hasAccess) {
        if (
          request.nextUrl.pathname.includes("/login") ||
          request.nextUrl.pathname.includes("/sign-up")
        ) {
          return Response.redirect(new URL("/payment", request.nextUrl));
        }

        return true;
      }

      if (!isLoggedIn && !isTryingToAccessApp) {
        return true;
      }
      return false;
    },
    //we want to pass more information when the token is created as next auth only gets user email from the authnicated user
    jwt: async ({ token, user, trigger }) => {
      if (user) {
        // on sign in
        token.userId = user.id as string;
        token.email = user.email!;
        token.hasAccess = user.hasAccess;
      }
      if (trigger === "update") {
        const userFromDb = await getUserByEmail(token.email);
        if (userFromDb) {
          token.hasAccess = userFromDb.hasAccess;
        }
      }

      return token;
    },
    //it will be availbable to the client so we need to be careful
    //we are trying to assign id as well into the token which by default can have only name and email
    session: ({ session, token }) => {
      session.user.id = token.userId;
      session.user.hasAccess = token.hasAccess;
      return session;
    },
  },
} satisfies NextAuthConfig;

export const {
  auth,
  signIn,
  signOut,
  handlers: { GET, POST },
} = NextAuth(config);
