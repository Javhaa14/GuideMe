"use client";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { axiosInstance } from "@/lib/utils";

export default function OnlineTracker() {
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status !== "authenticated" || !session?.user?.id) return;

    console.log("🔥 Sending userId:", session.user.id); // Debug log

    const interval = setInterval(() => {
      axiosInstance
        .post("/api/online", { userId: session.user.id })
        .catch((err) => console.error("OnlineTracker error:", err));
    }, 10000);

    return () => clearInterval(interval);
  }, [status, session?.user?.id]);

  return null;
}
