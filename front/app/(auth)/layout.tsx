import LeftLayout from "./sign-up/components/LeftLayout";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen w-screen">
      {/* Left Layout with Background */}
      <div className="flex w-full md:w-1/2">
        <LeftLayout />
      </div>

      {/* Right Content */}
      <div className="flex w-full md:w-1/2 items-center justify-center bg-white">
        {children}
      </div>
    </div>
  );
}
