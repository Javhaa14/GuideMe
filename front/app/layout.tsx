import "./globals.css";
import { Geist, Geist_Mono } from "next/font/google";
import { Providers } from "./providers";
<<<<<<< HEAD
=======
import { Toaster } from "@/components/ui/sonner";
>>>>>>> 610eaba0bbbbdad64c4fbe0fdae458b6d91bf28a

export const metadata = {
  title: "GuideMe",
  description: "GuideMe official website",
};

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white w-screen h-screen`}
        style={{ cursor: "auto" }}
<<<<<<< HEAD
      >
        <Providers>{children}</Providers>
=======
        cz-shortcut-listen="true">
        <Providers>{children}</Providers>
        <Toaster />
>>>>>>> 610eaba0bbbbdad64c4fbe0fdae458b6d91bf28a
      </body>
    </html>
  );
}
