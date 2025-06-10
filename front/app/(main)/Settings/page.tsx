import { Suspense } from "react";
import { SettingsPageClient } from "./components/SettingsPageClient";

export default function Page() {
  return (
    <Suspense fallback={<div>Loading Settings...</div>}>
      <SettingsPageClient />
    </Suspense>
  );
}
