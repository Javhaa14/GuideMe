import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import type { NextAuthOptions, User } from "next-auth";
type CustomUser = User & {
  role?: string;
};

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials): Promise<CustomUser | null> {
        try {
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

          return null;
        } catch (err) {
          console.error("Auth error:", err);
          throw new Error("Login failed");
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.user = {
          id: user.id,
          name: user.name ?? undefined,
          email: user.email ?? undefined,
          role: user.role,
        };
      }
      return token;
    },
    async session({ session, token }) {
      if (token.user) {
        session.user = token.user;
      }
      return session;
    },
  },

  pages: {
    signIn: "/login",
  },
  secret: process.env.NEXTAUTH_SECRET,
};

export default NextAuth(authOptions);
