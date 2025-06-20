"use client";

import React, {
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect,
} from "react";
import { useSession } from "next-auth/react";
<<<<<<< HEAD

=======
import { io, Socket } from "socket.io-client";

// ---- Context Definition ----
>>>>>>> 610eaba0bbbbdad64c4fbe0fdae458b6d91bf28a
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

<<<<<<< HEAD
=======
// ---- Socket Initialization ----
let socket: Socket | null = null;
if (typeof window !== "undefined" && !socket) {
  socket = io(process.env.NEXT_PUBLIC_BACKEND_URL);
}

// ---- Provider ----
>>>>>>> 610eaba0bbbbdad64c4fbe0fdae458b6d91bf28a
export function UserProvider({ children }: { children: ReactNode }) {
  const { data: session, status } = useSession();
  const [user, setUser] = useState<any | null>(null);

  useEffect(() => {
<<<<<<< HEAD
    // Just set user to session user or null
    setUser(session?.user || null);
  }, [session]);
=======
    setUser(session?.user || null);
  }, [session]);
  console.log(user);
>>>>>>> 610eaba0bbbbdad64c4fbe0fdae458b6d91bf28a

  return (
    <UserContext.Provider value={{ user, status, setUser }}>
      {children}
    </UserContext.Provider>
  );
}

<<<<<<< HEAD
=======
// ---- Hook ----
>>>>>>> 610eaba0bbbbdad64c4fbe0fdae458b6d91bf28a
export function useUser() {
  return useContext(UserContext);
}
