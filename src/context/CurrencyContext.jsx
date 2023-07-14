import { createContext, useState } from "react";

export const CurrencyProvider = createContext();

function CurrencyContext({ children }) {
  const [fromCurrency, setFromCurrency] = useState("Bitcoin BTC");
  const [toCurrency, setToCurrency] = useState("Наличные RUB");

  const value = {
    fromCurrency,
    setFromCurrency,
    toCurrency,
    setToCurrency,
  };

  return (
    <CurrencyProvider.Provider value={value}>
      {children}
    </CurrencyProvider.Provider>
  );
}

export { CurrencyContext };
