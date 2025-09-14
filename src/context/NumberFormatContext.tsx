"use client";

import { createContext, useContext } from "react";

function formatNumber(num: number): string {
  if (num >= 1_000_000_000) {
    return (num / 1_000_000_000).toFixed(1).replace(/\.0$/, "") + "B";
  }
  if (num >= 1_000_000) {
    return (num / 1_000_000).toFixed(1).replace(/\.0$/, "") + "M";
  }
  if (num >= 1_000) {
    return (num / 1_000).toFixed(1).replace(/\.0$/, "") + "K";
  }
  return num.toString();
}

type NumberFormatContextType = {
  format: (num: number) => string;
};

const NumberFormatContext = createContext<NumberFormatContextType>({
  format: (num) => num.toString(),
});

export function NumberFormatProvider({ children }: { children: React.ReactNode }) {
  return (
    <NumberFormatContext.Provider value={{ format: formatNumber }}>
      {children}
    </NumberFormatContext.Provider>
  );
}

export function useNumberFormat() {
  return useContext(NumberFormatContext);
}

