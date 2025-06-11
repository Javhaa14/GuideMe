"use client";

import { useState, useEffect } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:4000"); // Your backend URL here

export default function PasswordReset() {
  const [email, setEmail] = useState("");
  const [step, setStep] = useState<
    "enterEmail" | "waitingApproval" | "resetPassword"
  >("enterEmail");
  const [message, setMessage] = useState("");

  // Listen for reset approval from server via Socket.IO
  useEffect(() => {
    socket.on("resetApproved", (data) => {
      setMessage(data.message);
      setStep("resetPassword"); // move to next step automatically
    });

    return () => {
      socket.off("resetApproved");
    };
  }, []);

  const handleSendReset = async () => {
    setMessage("");
    try {
      const res = await fetch("/api/auth/request-reset", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (data.success) {
        setStep("waitingApproval");
        setMessage("Check your email and click the approve button.");
      } else {
        setMessage(data.error || "Something went wrong");
      }
    } catch (err) {
      setMessage("Failed to send request");
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
          {/* Here you can add your new password form */}
          <input
            type="password"
            placeholder="New password"
            style={{ width: "100%", padding: 8, marginBottom: 12 }}
          />
          <button>Submit New Password</button>
        </>
      )}

      {message && step === "enterEmail" && (
        <p style={{ color: "red" }}>{message}</p>
      )}
    </div>
  );
}
