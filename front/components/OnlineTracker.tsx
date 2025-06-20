"use client";
<<<<<<< HEAD
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { axiosInstance } from "@/lib/utils";
=======

import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { axiosInstance } from "@/lib/utils";
import { io, Socket } from "socket.io-client";

let socket: Socket | null = null;
>>>>>>> 610eaba0bbbbdad64c4fbe0fdae458b6d91bf28a

export default function OnlineTracker() {
  const { data: session, status } = useSession();

<<<<<<< HEAD
  useEffect(() => {
    if (status !== "authenticated" || !session?.user?.id) return;

    console.log("🔥 Sending userId:", session.user.id); // Debug log

    const interval = setInterval(() => {
      axiosInstance
        .post("/api/online", { userId: session.user.id })
=======
  // Initialize socket once (on client only)
  useEffect(() => {
    if (!socket && typeof window !== "undefined") {
      socket = io(
        process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:4000"
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
>>>>>>> 610eaba0bbbbdad64c4fbe0fdae458b6d91bf28a
        .catch((err) => console.error("OnlineTracker error:", err));
    }, 10000);

    return () => clearInterval(interval);
  }, [status, session?.user?.id]);

  return null;
}
