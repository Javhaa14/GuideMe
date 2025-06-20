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
import { LanguageProvider } from "./context/LanguageContext";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <LanguageProvider>
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
      </LanguageProvider>
    </SessionProvider>
  );
}
