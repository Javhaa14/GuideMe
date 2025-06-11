// reset/approve/page.tsx
"use client";

import { axiosInstance } from "@/lib/utils";
import { useEffect } from "react";

export default function ApproveReset() {
  useEffect(() => {
    const token = new URLSearchParams(window.location.search).get("token");
    if (!token) return;

    console.log("🆗 Approve token:", token);

    const approve = async () => {
      try {
        const res = await axiosInstance.post("/auth/approve-reset", { token });
        console.log("✅ Approve response:", res.data);
        window.close(); // optionally close the tab
      } catch (err) {
        console.error("❌ Failed to approve reset:", err);
      }
    };

    approve();
  }, []);

  return <p>Approving password reset...</p>;
}
