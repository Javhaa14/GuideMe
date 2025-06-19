"use client";
import { createContext, ReactNode, useContext, useState } from "react";
import { Guide } from "../(main)/Guidesinfo/page";

type FilteredDataContextType = {
  filteredData: Guide[];
  setFilteredData: React.Dispatch<React.SetStateAction<Guide[]>>;
};

export const FilteredDataContext = createContext<
  FilteredDataContextType | undefined
>(undefined);

export function useFilteredData() {
  const context = useContext(FilteredDataContext);
  if (!context) {
    throw new Error(
      "useFilteredData must be used within a FilteredDataProvider"
    );
  }
  return context;
}

// Provider component
export function FilteredDataProvider({ children }: { children: ReactNode }) {
  const [filteredData, setFilteredData] = useState<Guide[]>([]);

  return (
    <FilteredDataContext.Provider value={{ filteredData, setFilteredData }}>
      {children}
    </FilteredDataContext.Provider>
  );
}
