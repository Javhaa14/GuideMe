"use client";
import { createContext, ReactNode, useContext, useState } from "react";

type SearchLocationContextType = {
  searchedValue: string;
  setSearchedValue: React.Dispatch<React.SetStateAction<string>>;
};

export const SearchLocationContext = createContext<
  SearchLocationContextType | undefined
>(undefined);

export function useSearchLocation() {
  const context = useContext(SearchLocationContext);
  if (!context) {
    throw new Error(
      "useSearchRegion must be used within a SearchRegionProvider"
    );
  }
  return context;
}

// Provider component
export function SearchLocationProvider({ children }: { children: ReactNode }) {
  const [searchedValue, setSearchedValue] = useState<string>("");

  return (
    <SearchLocationContext.Provider value={{ searchedValue, setSearchedValue }}>
      {children}
    </SearchLocationContext.Provider>
  );
}
