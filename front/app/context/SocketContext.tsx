"use client";

<<<<<<< HEAD
import { createContext, useContext, useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";

type SocketContextType = {
  socket: Socket | null;
  isConnected: boolean;
};
=======
import { createContext, useContext, useEffect, useRef, useState } from "react";
import { io, Socket } from "socket.io-client";
import { useSession } from "next-auth/react";

interface SocketContextType {
  socket: Socket | null;
  isConnected: boolean;
}
>>>>>>> 610eaba0bbbbdad64c4fbe0fdae458b6d91bf28a

const SocketContext = createContext<SocketContextType>({
  socket: null,
  isConnected: false,
});

export const SocketProvider = ({ children }: { children: React.ReactNode }) => {
<<<<<<< HEAD
  const [socket, setSocket] = useState<Socket | null>(null);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const newSocket = io(process.env.NEXT_PUBLIC_BACKEND_URL!, {
      transports: ["websocket", "polling"],
      withCredentials: true,
    });

    setSocket(newSocket);

    newSocket.on("connect", () => {
      console.log("✅ Socket connected:", newSocket.id);
      setIsConnected(true);
    });

    newSocket.on("disconnect", () => {
      console.log("❌ Socket disconnected");
      setIsConnected(false);
    });

    newSocket.on("connect_error", (err) => {
      console.error("🚨 Socket connection error:", err.message);
    });

    // ✅ Cleanup function MUST return void
    return () => {
      newSocket.disconnect();
    };
  }, []);

  return (
    <SocketContext.Provider value={{ socket, isConnected }}>
=======
  const { data: session } = useSession();
  const userId = session?.user?.id;

  const socketRef = useRef<Socket | null>(null);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    if (!userId) return;

    const socket = io("https://guideme-8o9f.onrender.com", {
      transports: ["websocket"],
      withCredentials: true,
    });

    socket.on("connect", () => {
      console.log("✅ Socket connected:", socket.id);
      socket.emit("identify", userId);
      socket.emit("joinNotificationRoom", userId);
      setIsConnected(true);
    });

    socket.on("disconnect", (reason) => {
      console.warn("🔌 Socket disconnected:", reason);
      setIsConnected(false);
    });

    socket.on("connect_error", (err) => {
      console.error("❌ Socket connection error:", err);
    });

    socketRef.current = socket;

    return () => {
      socket.disconnect();
      setIsConnected(false);
    };
  }, [userId]);

  return (
    <SocketContext.Provider value={{ socket: socketRef.current, isConnected }}>
>>>>>>> 610eaba0bbbbdad64c4fbe0fdae458b6d91bf28a
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = () => useContext(SocketContext);
