"use client";

import { useState } from "react";

export default function ResetPasswordPage() {
  const [email, setEmail] = useState("");
  const [step, setStep] = useState<"enter-email" | "waiting" | "approved">(
    "enter-email"
  );
  const [status, setStatus] = useState("");
  const [token, setToken] = useState("");
  const [password, setPassword] = useState("");

  // Submit email to request reset
  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch(
      "https://guideme-8o9f.onrender.com/auth/request-reset",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      }
    );
    const data = await res.json();
    setStatus(data.message || "Check your email to approve the reset.");
    setStep("waiting");
  };

  // Submit token after clicking "Approve" in email (form POSTs to this page)
  const handleApprove = async (formData: FormData) => {
    const formToken = formData.get("token") as string;
    const res = await fetch(
      "https://guideme-8o9f.onrender.com/auth/verify-reset-token",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token: formToken }),
      }
    );
    const data = await res.json();
    if (data.success) {
      setToken(formToken);
      setStep("approved");
    } else {
      setStatus("Invalid or expired token.");
    }
  };

  // Submit new password
  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch(
      "https://guideme-8o9f.onrender.com/auth/reset-password-final",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, password }),
      }
    );
    const data = await res.json();
    setStatus(data.message);
  };

  return (
    <div style={{ padding: "2rem", fontFamily: "sans-serif" }}>
      <h2>Reset Password</h2>

      {step === "enter-email" && (
        <form onSubmit={handleEmailSubmit}>
          <input
            type="email"
            placeholder="Enter your email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{ padding: "0.5rem", width: "100%", marginBottom: "1rem" }}
          />
          <button type="submit" style={{ padding: "0.5rem 1rem" }}>
            Send Reset Approval Email
          </button>
        </form>
      )}

      {step === "waiting" && <p>{status}</p>}

      {/* This will be hit when email's form POSTs to this route */}
      <form
        action="/reset"
        method="POST"
        style={{ display: "none" }}
        onSubmit={(e) => e.preventDefault()}>
        <input
          type="hidden"
          name="token"
          value={
            typeof window !== "undefined"
              ? new URLSearchParams(window.location.search).get("token") || ""
              : ""
          }
        />
      </form>

      {/* Next step: Set new password */}
      {step === "approved" && (
        <form onSubmit={handlePasswordSubmit}>
          <input
            type="password"
            placeholder="New password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ padding: "0.5rem", width: "100%", marginBottom: "1rem" }}
          />
          <button type="submit" style={{ padding: "0.5rem 1rem" }}>
            Set New Password
          </button>
        </form>
      )}

      {status && <p style={{ marginTop: "1rem", color: "green" }}>{status}</p>}
    </div>
  );
}
