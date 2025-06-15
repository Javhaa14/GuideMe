"use client";
import { createContext, ReactNode, useContext, useState } from "react";

type PriceRangeContextType = {
  priceRange: number[];
  setPriceRange: React.Dispatch<React.SetStateAction<number[]>>;
};

export const PriceRangeContext = createContext<
  PriceRangeContextType | undefined
>(undefined);

export function usePriceRange() {
  const context = useContext(PriceRangeContext);
  if (!context) {
    throw new Error("usePriceRange must be used within a PriceRangeProvider");
  }
  return context;
}

// Provider component
export function PriceRangeProvider({ children }: { children: ReactNode }) {
  const [priceRange, setPriceRange] = useState<number[]>([0, 100]);

  return (
    <PriceRangeContext.Provider value={{ priceRange, setPriceRange }}>
      {children}
    </PriceRangeContext.Provider>
  );
}
