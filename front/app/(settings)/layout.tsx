import { Footer } from "../(main)/components/Footer";
import { Navigation } from "../(main)/components/Navigation";
import { ButtonLayout } from "./settings/components/ButtonLayout";
import { SettingsNavigation } from "./settings/components/SettingsNavigation";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <SettingsNavigation />
      <div className="flex h-screen w-screen">
        <div className="flex w-[30%]">
          <ButtonLayout />
        </div>
        <div className="flex w-[70%]">{children}</div>
      </div>
      <Footer />
    </div>
  );
}
