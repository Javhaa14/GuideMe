"use client";

import { axiosInstance } from "@/lib/utils";
import { useState, useEffect, useRef } from "react";
import { io, Socket } from "socket.io-client";

type ResetStep = "enterEmail" | "waitingApproval" | "resetPassword";

export default function PasswordReset() {
  const [email, setEmail] = useState("");
  const [step, setStep] = useState<ResetStep>("enterEmail");
  const [message, setMessage] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const socketRef = useRef<Socket | null>(null);

  // Setup Socket.IO connection only once
  useEffect(() => {
    console.log("🔌 Connecting to socket...");
    const socket = io("https://guideme-8o9f.onrender.com", {
      transports: ["websocket"], // Optional: improves speed
    });

    socketRef.current = socket;

    socket.on("resetApproved", (data) => {
      console.log("✅ resetApproved received:", data);
      setMessage(data.message || "You may now reset your password.");
      setStep("resetPassword");
    });

    return () => {
      console.log("🔌 Disconnecting socket...");
      socket.disconnect();
    };
  }, []);

  const handleSendReset = async () => {
    setMessage("");
    try {
      console.log("📨 Sending reset email to:", email);
      const res = await axiosInstance.post("/auth/request-reset", { email });
      console.log("📩 Response from server:", res.data);

      if (res.data.success) {
        setStep("waitingApproval");
        setMessage("Check your email and click the approve button.");
      } else {
        setMessage(res.data.error || "Something went wrong");
      }
    } catch (err) {
      console.error("❌ Failed to send request:", err);
      setMessage("Failed to send request");
    }
  };

  const handleSubmitNewPassword = async () => {
    if (!newPassword) return setMessage("Password cannot be empty");

    try {
      const res = await axiosInstance.post("/auth/reset-password", {
        email,
        newPassword,
      });

      if (res.data.success) {
        setMessage("✅ Password reset successfully!");
        setStep("enterEmail"); // or redirect
      } else {
        setMessage(res.data.error || "Something went wrong.");
      }
    } catch (error) {
      console.error("❌ Error resetting password:", error);
      setMessage("Server error occurred.");
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: "auto", padding: 20 }}>
      {step === "enterEmail" && (
        <>
          <h2>Reset Password</h2>
          <input
            type="email"
            placeholder="Your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{ width: "100%", padding: 8, marginBottom: 12 }}
          />
          <button onClick={handleSendReset} disabled={!email}>
            Send Reset Email
          </button>
        </>
      )}

      {step === "waitingApproval" && (
        <>
          <h2>Waiting for approval</h2>
          <p>{message}</p>
          <p>Please click the button in your email to approve the reset.</p>
        </>
      )}

      {step === "resetPassword" && (
        <>
          <h2>Reset Password</h2>
          <p>{message}</p>
          <input
            type="password"
            placeholder="New password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            style={{ width: "100%", padding: 8, marginBottom: 12 }}
          />
          <button onClick={handleSubmitNewPassword}>Submit New Password</button>
        </>
      )}

      {message && step === "enterEmail" && (
        <p style={{ color: "red" }}>{message}</p>
      )}
    </div>
  );
}
