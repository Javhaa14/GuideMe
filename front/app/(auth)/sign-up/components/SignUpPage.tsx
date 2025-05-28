"use client";
import { useState } from "react";

import { SignUpEmailPassword } from "./SignUpEmailPassword";
import { SignUpUsername } from "./SignUpUsername";

export function SignUpPage() {
  const [step, setStep] = useState<number>(0);
  const [username, setUsername] = useState<string>("");

  if (step === 0) {
    return <SignUpUsername setStep={setStep} setUsername={setUsername} />;
  } else {
    return <SignUpEmailPassword username={username} />;
  }
}
