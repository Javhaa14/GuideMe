"use client";

import React, {
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect,
} from "react";
import { useSession } from "next-auth/react";
import { io, Socket } from "socket.io-client";

// ---- Context Definition ----
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

// ---- Socket Initialization ----
let socket: Socket | null = null;
if (typeof window !== "undefined" && !socket) {
  socket = io(process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:4000");
}

// ---- Provider ----
export function UserProvider({ children }: { children: ReactNode }) {
  const { data: session, status } = useSession();
  const [user, setUser] = useState<any | null>(null);

  useEffect(() => {
    setUser(session?.user || null);
  }, [session]);

  return (
    <UserContext.Provider value={{ user, status, setUser }}>
      {children}
    </UserContext.Provider>
  );
}

// ---- Hook ----
export function useUser() {
  return useContext(UserContext);
}
