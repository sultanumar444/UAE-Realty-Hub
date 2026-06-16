import { createContext, useContext, useState, useEffect, ReactNode } from "react";

type Currency = "AED" | "USD" | "GBP" | "EUR" | "INR";

interface CurrencyContextType {
  currency: Currency;
  setCurrency: (c: Currency) => void;
  formatPrice: (amountAed: number) => string;
  convert: (amountAed: number) => number;
  symbol: string;
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

const RATES: Record<Currency, number> = {
  AED: 1,
  USD: 0.272,
  GBP: 0.215,
  EUR: 0.253,
  INR: 22.7,
};

const SYMBOLS: Record<Currency, string> = {
  AED: "AED",
  USD: "$",
  GBP: "£",
  EUR: "€",
  INR: "₹",
};

export function CurrencyProvider({ children }: { children: ReactNode }) {
  const [currency, setCurrencyState] = useState<Currency>("AED");

  useEffect(() => {
    const saved = localStorage.getItem("app_currency") as Currency | null;
    if (saved && RATES[saved]) {
      setCurrencyState(saved);
    }
  }, []);

  const setCurrency = (c: Currency) => {
    setCurrencyState(c);
    localStorage.setItem("app_currency", c);
  };

  const formatPrice = (amountAed: number) => {
    const amount = amountAed * RATES[currency];
    
    // Format with commas, no decimals
    const formatted = new Intl.NumberFormat("en-US", {
      maximumFractionDigits: 0,
    }).format(amount);

    if (currency === "AED") {
      return `AED ${formatted}`;
    }
    return `${SYMBOLS[currency]}${formatted}`;
  };

  const convert = (amountAed: number) => amountAed * RATES[currency];

  return (
    <CurrencyContext.Provider value={{ currency, setCurrency, formatPrice, convert, symbol: SYMBOLS[currency] }}>
      {children}
    </CurrencyContext.Provider>
  );
}

export function useCurrency() {
  const context = useContext(CurrencyContext);
  if (!context) {
    throw new Error("useCurrency must be used within a CurrencyProvider");
  }
  return context;
}
