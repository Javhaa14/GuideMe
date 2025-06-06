"use client";

import { useSearchParams } from "next/navigation";
import { SettingsButton } from "./components/SettingsButton";
import { Password } from "./components/Password";
import { Personal } from "./components/Personal";

export default function Page() {
  const searchParams = useSearchParams();
  const tab = (searchParams.get("tab") || "personal").toLowerCase();

  return (
    <div className="space-y-6">
      <SettingsButton />
      {tab === "password" ? <Password /> : <Personal />}
    </div>
  );
}
