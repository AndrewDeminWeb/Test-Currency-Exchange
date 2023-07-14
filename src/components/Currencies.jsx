import { useContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Directions } from "./Directions";
import { FilterDirections } from "./FilterDirections";
import { directions, filter } from "../currenciesData";
import { useActions } from "../store/useActions";
import revers_currency from "../imgs/reverse_currency.png";
import { CurrencyProvider } from "../context/CurrencyContext";

function Currencies() {
  const { getCurrencies, filterCurrencies, filterCurrenciesDirection } =
    useActions();

  const directionsData = useSelector(
    (state) => state.currencies.directionsData
  );
  const filterData = useSelector((state) => state.currencies.filterData);

  const [filterFrom, setFilterFrom] = useState("Bitcoin BTC");

  const { fromCurrency, setFromCurrency, toCurrency, setToCurrency } =
    useContext(CurrencyProvider);

  const [currenciesValue, setCurrenciesValue] = useState("");

  useEffect(() => {
    getCurrencies({ filter, directions });
  }, []);

  const handleReverseCurrency = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };

  return (
    <div>
      <Directions
        directionsData={directionsData}
        setFilterFrom={setFilterFrom}
        filterCurrenciesDirection={filterCurrenciesDirection}
        filterCurrencies={filterCurrencies}
        setCurrenciesValue={setCurrenciesValue}
        value={fromCurrency}
        setValue={setFromCurrency}
      />

      <img
        src={revers_currency}
        alt="туда сюда"
        onClick={handleReverseCurrency}
      />

      <FilterDirections
        filterData={filterData}
        filterFrom={filterFrom}
        filterCurrencies={filterCurrencies}
        currenciesValue={currenciesValue}
        value={toCurrency}
        setValue={setToCurrency}
      />
    </div>
  );
}

export { Currencies };
