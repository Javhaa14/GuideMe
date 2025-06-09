import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import FacebookProvider from "next-auth/providers/facebook";
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
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/signin`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(credentials),
          }
        );

        const data = await res.json();

        if (res.ok && data?.user) {
          return {
            id: data.user.id, // This should already be your MongoDB _id
            name: data.user.username,
            email: data.user.email,
            role: data.user.role,
          };
        }

        return null;
      },
    }),

    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),

    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    }),

    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID!,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET!,
    }),
  ],

  session: {
    strategy: "jwt",
  },

  callbacks: {
    async signIn({ user, account }) {
      if (!user?.email || !account?.provider) return false;

      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/check-or-create-user`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              email: user.email,
              name: user.name,
              provider: account.provider,
              provider_id: account.providerAccountId || account.id,
            }),
          }
        );

        if (!res.ok) return false;

        const data = await res.json();

        // Attach Mongo _id to user.id
        if (data?.id) {
          user.id = data.id; // Your MongoDB _id
          (user as any).role = data.role;
        }

        return true;
      } catch (error) {
        console.error("Error in signIn callback:", error);
        return false;
      }
    },

    async jwt({ token, user }: { token: JWT; user?: User }) {
      if (user) {
        token.user = {
          id: (user as any).id,
          name: user.name ?? undefined,
          email: user.email ?? undefined,
          role: (user as any).role,
        };
      }
      return token;
    },

    async session({ session, token }: { session: Session; token: JWT }) {
      if (token.user) {
        session.user = {
          id: (token.user as any).id,
          name: token.user.name ?? undefined,
          email: token.user.email ?? undefined,
          role: (token.user as any).role,
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
