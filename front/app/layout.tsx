"use client";

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SessionProvider } from "next-auth/react";
import { UserProvider } from "./context/Usercontext";
import OnlineTracker from "@/components/OnlineTracker";
import { OnlineStatusProvider } from "./context/Onlinestatus";
import { PriceRangeProvider } from "./context/PriceRangeContext";
import { SearchLocationProvider } from "./context/SearchLocationContext";
import { FilteredDataProvider } from "./context/FilteredDataContext";

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
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white w-screen h-screen`}
        cz-shortcut-listen="true"
        style={{ cursor: "auto" }}
      >
        <SessionProvider>
          <OnlineStatusProvider>
            <OnlineTracker />
            <FilteredDataProvider>
              <SearchLocationProvider>
                <PriceRangeProvider>
                  <UserProvider>{children}</UserProvider>
                </PriceRangeProvider>
              </SearchLocationProvider>
            </FilteredDataProvider>
          </OnlineStatusProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
