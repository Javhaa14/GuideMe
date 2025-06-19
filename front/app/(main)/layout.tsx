"use client";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Navigation } from "./components/Navigation";
import Footer from "./components/Footer";

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
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div
<<<<<<< HEAD
      className={`${geistSans.variable} ${geistMono.variable} antialiased w-screen h-auto`}>
      <Navigation />
      <div className="invicible h-[50px]"></div>
      {children}
=======
      className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white w-screen h-auto`}
    >
      <Navigation />
      {children}
      <Footer />
>>>>>>> 8cf4585019f5686889b411c16e1309b7d5003305
    </div>
  );
}
