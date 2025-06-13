"use client";

import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "next-themes";
import { UserProvider } from "./context/Usercontext";
import { OnlineStatusProvider } from "./context/Onlinestatus";
import { PriceRangeProvider } from "./context/PriceRangeContext";
import { SearchLocationProvider } from "./context/SearchLocationContext";
import { FilteredDataProvider } from "./context/FilteredDataContext";
import OnlineTracker from "@/components/OnlineTracker";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem={true}
      disableTransitionOnChange
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
    </ThemeProvider>
  );
}
