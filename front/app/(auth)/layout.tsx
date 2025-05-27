import LeftLayout from "./sign-up/components/LeftLayout";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen w-screen">
      <div className="flex w-full md:w-1/2">
        <LeftLayout />
      </div>

      <div className="flex w-full md:w-1/2 items-center justify-center bg-white">
        {children}
      </div>
    </div>
  );
}
