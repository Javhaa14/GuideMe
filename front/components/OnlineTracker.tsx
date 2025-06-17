"use client";

import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { axiosInstance } from "@/lib/utils";
import { io, Socket } from "socket.io-client";

let socket: Socket | null = null;

export default function OnlineTracker() {
  const { data: session, status } = useSession();

  // Initialize socket once (on client only)
  useEffect(() => {
    if (!socket && typeof window !== "undefined") {
      socket = io(
        process.env.NEXT_PUBLIC_SOCKET_URL || "http://localhost:4000"
      );
    }
  }, []);

  useEffect(() => {
    if (!socket) return;

    if (status !== "authenticated" || !session?.user) {
      return;
    }

    const userId = session.user.id;
    if (!userId) {
      console.warn("User ID missing in session.user");
      return;
    }

    function onConnect() {
      socket?.emit("identify", userId);
      console.log("Emitted identify on connect with userId:", userId);
    }

    socket.on("connect", onConnect);

    // In case socket is already connected before adding listener
    if (socket.connected) {
      onConnect();
    }

    return () => {
      socket?.off("connect", onConnect);
    };
  }, [status, session?.user]);

  // Poll backend every 10 seconds with userId to update online status
  useEffect(() => {
    if (status !== "authenticated" || !session?.user?.id) return;

    const userId = session.user.id;

    const interval = setInterval(() => {
      axiosInstance
        .post("/api/online", { userId })
        .catch((err) => console.error("OnlineTracker error:", err));
    }, 10000);

    return () => clearInterval(interval);
  }, [status, session?.user?.id]);

  return null;
}
