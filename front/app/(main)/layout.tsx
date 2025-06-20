"use client";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Navigation } from "./components/Navigation";
<<<<<<< HEAD
import { Footer } from "./components/Footer";
=======
import Footer from "./components/Footer";
>>>>>>> 610eaba0bbbbdad64c4fbe0fdae458b6d91bf28a

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
      className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white w-screen h-auto`}
    >
      <Navigation />
      {children}
      <Footer />
=======
      className={`${geistSans.variable} ${geistMono.variable} antialiased w-screen h-auto`}>
      <Navigation />
      <div className="invicible h-[50px]"></div>
      {children}
>>>>>>> 610eaba0bbbbdad64c4fbe0fdae458b6d91bf28a
    </div>
  );
}
