"use client";
import React, { createContext, useContext, ReactNode } from "react";
import { useSession } from "next-auth/react";

interface UserContextType {
  user: any | null;
  status: "loading" | "authenticated" | "unauthenticated";
}

const UserContext = createContext<UserContextType>({
  user: null,
  status: "loading",
});

export function UserProvider({ children }: { children: ReactNode }) {
  const { data: session, status } = useSession();

  return (
    <UserContext.Provider value={{ user: session?.user || null, status }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  return useContext(UserContext);
}
