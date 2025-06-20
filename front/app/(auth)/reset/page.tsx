"use client";

import { axiosInstance } from "@/lib/utils";
<<<<<<< HEAD
import { useState, useEffect } from "react";
import { io } from "socket.io-client";

const socket = io("https://guideme-8o9f.onrender.com"); // Your backend URL here

export default function PasswordReset() {
  const [email, setEmail] = useState("");
  const [step, setStep] = useState<
    "enterEmail" | "waitingApproval" | "resetPassword"
  >("enterEmail");
  const [message, setMessage] = useState("");

  // Listen for reset approval from server via Socket.IO
  useEffect(() => {
    console.log("🔌 Connecting to socket...");
    socket.on("resetApproved", (data) => {
      console.log("✅ resetApproved received:", data);
      setMessage(data.message);
=======
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
>>>>>>> 610eaba0bbbbdad64c4fbe0fdae458b6d91bf28a
      setStep("resetPassword");
    });

    return () => {
<<<<<<< HEAD
      socket.off("resetApproved");
=======
      console.log("🔌 Disconnecting socket...");
      socket.disconnect();
>>>>>>> 610eaba0bbbbdad64c4fbe0fdae458b6d91bf28a
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

<<<<<<< HEAD
=======
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

>>>>>>> 610eaba0bbbbdad64c4fbe0fdae458b6d91bf28a
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
<<<<<<< HEAD
          {/* Here you can add your new password form */}
          <input
            type="password"
            placeholder="New password"
            style={{ width: "100%", padding: 8, marginBottom: 12 }}
          />
          <button>Submit New Password</button>
=======
          <input
            type="password"
            placeholder="New password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            style={{ width: "100%", padding: 8, marginBottom: 12 }}
          />
          <button onClick={handleSubmitNewPassword}>Submit New Password</button>
>>>>>>> 610eaba0bbbbdad64c4fbe0fdae458b6d91bf28a
        </>
      )}

      {message && step === "enterEmail" && (
        <p style={{ color: "red" }}>{message}</p>
      )}
    </div>
  );
}
