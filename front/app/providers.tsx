"use client";

import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "next-themes";
import { UserProvider } from "./context/Usercontext";
<<<<<<< HEAD
=======
import { ProfileProvider } from "./context/ProfileContext";
>>>>>>> 610eaba0bbbbdad64c4fbe0fdae458b6d91bf28a
import { OnlineStatusProvider } from "./context/Onlinestatus";
import { PriceRangeProvider } from "./context/PriceRangeContext";
import { SearchLocationProvider } from "./context/SearchLocationContext";
import { FilteredDataProvider } from "./context/FilteredDataContext";
import OnlineTracker from "@/components/OnlineTracker";
import { SocketProvider } from "./context/SocketContext";
<<<<<<< HEAD

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem={true}
      disableTransitionOnChange>
      <SessionProvider>
=======
import { NotificationProvider } from "./context/NotificationContext";
import { LanguageProvider } from "./context/LanguageContext";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <LanguageProvider>
>>>>>>> 610eaba0bbbbdad64c4fbe0fdae458b6d91bf28a
        <OnlineStatusProvider>
          <OnlineTracker />
          <FilteredDataProvider>
            <SearchLocationProvider>
              <PriceRangeProvider>
                <SocketProvider>
<<<<<<< HEAD
                  <UserProvider>{children}</UserProvider>
=======
                  <NotificationProvider>
                    <UserProvider>
                      <ProfileProvider>{children}</ProfileProvider>
                    </UserProvider>
                  </NotificationProvider>
>>>>>>> 610eaba0bbbbdad64c4fbe0fdae458b6d91bf28a
                </SocketProvider>
              </PriceRangeProvider>
            </SearchLocationProvider>
          </FilteredDataProvider>
        </OnlineStatusProvider>
<<<<<<< HEAD
      </SessionProvider>
    </ThemeProvider>
=======
      </LanguageProvider>
    </SessionProvider>
>>>>>>> 610eaba0bbbbdad64c4fbe0fdae458b6d91bf28a
  );
}
