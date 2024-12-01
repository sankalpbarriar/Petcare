import NextAuth, { NextAuthConfig } from "next-auth";

const config = {
  pages: {
    signIn: "/login",
  },
  session: {
    //for this duration user does not need to login again
    maxAge: 10 * 24 * 60 * 60,
    strategy: "jwt",
  },
  providers: [], //email password, github , google
  callbacks: {
    //if the user is attempting to login we can add some logic here
    authorized: ({ request }) => {
      const isTryingToAccessApp = request.nextUrl.pathname.includes("/app");
      if (isTryingToAccessApp) {
        return false;
      } else return true;
    },
  },
} satisfies NextAuthConfig;

export const { auth } = NextAuth(config);
