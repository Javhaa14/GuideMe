"use client";

import { useSearchParams } from "next/navigation";
import { SettingsButton } from "./SettingsButton";
import { Password } from "./Password";
import { Personal } from "./Personal";

export function SettingsPageClient() {
  const searchParams = useSearchParams();
  const tab = (searchParams.get("tab") || "personal").toLowerCase();

  return (
    <div className="space-y-6">
      <SettingsButton />
      {tab === "password" ? <Password /> : <Personal />}
    </div>
  );
}
