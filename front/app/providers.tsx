"use client";

import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "next-themes";
import { UserProvider } from "./context/Usercontext";
import { OnlineStatusProvider } from "./context/Onlinestatus";
import { PriceRangeProvider } from "./context/PriceRangeContext";
import { SearchLocationProvider } from "./context/SearchLocationContext";
import { FilteredDataProvider } from "./context/FilteredDataContext";
import OnlineTracker from "@/components/OnlineTracker";
import { SocketProvider } from "./context/SocketContext";
import { NotificationProvider } from "./context/NotificationContext";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem={true}
      disableTransitionOnChange>
      <SessionProvider>
        <OnlineStatusProvider>
          <OnlineTracker />
          <FilteredDataProvider>
            <SearchLocationProvider>
              <PriceRangeProvider>
                <SocketProvider>
                  <NotificationProvider>
                    <UserProvider>{children}</UserProvider>
                  </NotificationProvider>
                </SocketProvider>
              </PriceRangeProvider>
            </SearchLocationProvider>
          </FilteredDataProvider>
        </OnlineStatusProvider>
      </SessionProvider>
    </ThemeProvider>
  );
}
