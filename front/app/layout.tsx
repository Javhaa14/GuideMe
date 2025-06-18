import "./globals.css";
import { Geist, Geist_Mono } from "next/font/google";
import { Providers } from "./providers";

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
        cz-shortcut-listen="true">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
