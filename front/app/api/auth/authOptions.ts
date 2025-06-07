import CredentialsProvider from "next-auth/providers/credentials";
import type { JWT } from "next-auth/jwt";
import type { User, Session, NextAuthOptions } from "next-auth";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials) return null;

        const res = await fetch(
          "https://guideme-8o9f.onrender.com/auth/signin",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(credentials),
          }
        );

        const data = await res.json();

        if (res.ok && data?.user) {
          return {
            id: data.user.id,
            name: data.user.username,
            email: data.user.email,
            role: data.user.role,
          };
        }

        return null; // important to return null if authentication fails
      },
    }),
  ],
  session: {
    strategy: "jwt", // TypeScript will validate this now
  },
  callbacks: {
    async jwt({ token, user }: { token: JWT; user?: User }) {
      if (user) {
        token.user = {
          id: user.id,
          name: user.name || undefined,
          email: user.email || undefined,
          role: (user as any).role, // cast if role is not in User type
        };
      }
      return token;
    },
    async session({ session, token }: { session: Session; token: JWT }) {
      if (token.user) {
        session.user = {
          ...token.user,
          name: token.user.name || undefined,
          email: token.user.email || undefined,
        };
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
  secret: process.env.NEXTAUTH_SECRET,
};
