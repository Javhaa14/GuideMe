"use client";

import React, {
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect,
} from "react";
import { useSession } from "next-auth/react";

interface UserContextType {
  user: any | null;
  status: "loading" | "authenticated" | "unauthenticated";
  setUser: (user: any | null) => void;
}

const UserContext = createContext<UserContextType>({
  user: null,
  status: "loading",
  setUser: () => {},
});

export function UserProvider({ children }: { children: ReactNode }) {
  const { data: session, status } = useSession();
  const [user, setUser] = useState<any | null>(null);

  useEffect(() => {
    // Just set user to session user or null
    setUser(session?.user || null);
  }, [session]);

  return (
    <UserContext.Provider value={{ user, status, setUser }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  return useContext(UserContext);
}
