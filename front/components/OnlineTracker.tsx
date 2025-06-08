"use client";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { axiosInstance } from "@/lib/utils";

export default function OnlineTracker() {
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status !== "authenticated") return;

    const interval = setInterval(() => {
      axiosInstance.post("/api/online", {
        userId: session.user.id,
      });
    }, 1000); // every 10s

    return () => clearInterval(interval);
  }, [status, session]);

  return null;
}
