import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import styles from "../css/currencies_styles.module.scss";

function FilterDirections({
  filterData,
  filterFrom,
  filterCurrencies,
  currenciesValue,
  value,
  setValue,
}) {
  const currenciesFilter = useSelector(
    (state) => state.currencies.currenciesFilter
  );
  const [filterCurr, setFilterCurr] = useState(filterData);
  const [currenciesFilterFrom, setCurrenciesFilterFrom] = useState(filterCurr);
  const [convertCurrencies, setConvertCurrencies] = useState(currenciesValue);
  const selectRef = useRef(null);

  useEffect(() => {
    setFilterCurr(filterData);
  }, [filterData]);

  useEffect(() => {
    switch (currenciesFilter) {
      case "crypto":
        setFilterCurr(
          filterData.filter(
            (d) => ["BTC", "ETH", "USDTTRC"].indexOf(d.from.code) !== -1
          )
        );
        break;
      case "cash":
        setFilterCurr(
          filterData.filter(
            (d) => ["CASHUSD", "CASHRUB"].indexOf(d.from.code) !== -1
          )
        );
        break;
      case "banksRUB":
      case "banksUAH":
        setFilterCurr(
          filterData.filter(
            (d) => ["ACRUB", "SBERRUB", "TCSBRUB"].indexOf(d.from.code) !== -1
          )
        );
        break;
      default:
        setFilterCurr(filterData);
    }
  }, [currenciesFilter, filterData, filterFrom]);

  useEffect(() => {
    setCurrenciesFilterFrom(
      filterCurr.filter((d) => d.from.name.includes(filterFrom))
    );
  }, [currenciesFilter, filterFrom, filterCurr]);

  useEffect(() => {
    switch (filterFrom) {
      case "Bitcoin BTC":
        setConvertCurrencies(currenciesValue * 2320.001);
        break;
      case "Ethereum ETH":
        setConvertCurrencies(currenciesValue * 156.001);
        break;
      case "Наличные USD":
        setConvertCurrencies(currenciesValue * 80.001);
        break;
      case "Наличные RUB":
        setConvertCurrencies(currenciesValue * 0.0118093417207215);
        break;
      case "Альфа-банк RUB":
        setConvertCurrencies(currenciesValue * 67.001);
        break;
      case "Сбербанк RUB":
        setConvertCurrencies(currenciesValue * 76.001);
        break;
      case "Тинькофф RUB":
        setConvertCurrencies(currenciesValue * 35.001);
        break;
      case "Tether TRC20 USDT":
        setConvertCurrencies(currenciesValue * 156.001);
        break;
      default:
        setConvertCurrencies(currenciesValue);
    }
  }, [filterFrom, currenciesValue]);

  const handleChangeValue = (e) => {
    setValue(e.target.options[e.target.selectedIndex].textContent);
  };

  return (
    <div className={styles.filter}>
      <div className={styles.header}>Получаете</div>
      <div className={styles.filterCurr}>
        <button
          onClick={() => filterCurrencies("")}
          className={currenciesFilter === "" ? styles.selectFilter : ``}>
          Все
        </button>

        <button
          onClick={() => filterCurrencies("crypto")}
          className={currenciesFilter === "crypto" ? styles.selectFilter : ``}>
          Криптовалюты
        </button>

        <button
          onClick={() => filterCurrencies("cash")}
          className={currenciesFilter === "cash" ? styles.selectFilter : ``}>
          Наличные
        </button>

        <button
          onClick={() => filterCurrencies("banksRUB")}
          className={
            currenciesFilter === "banksRUB" ? styles.selectFilter : ``
          }>
          Банки RUB
        </button>

        <button
          onClick={() => filterCurrencies("banksUAH")}
          className={
            currenciesFilter === "banksUAH" ? styles.selectFilter : ``
          }>
          Банки UAH
        </button>
      </div>

      <div>
        <input type="text" value={convertCurrencies} />

        <select onChange={handleChangeValue} ref={selectRef}>
          {currenciesFilterFrom.map((filterFrom) =>
            filterFrom.to.map((filter, i) => (
              <option key={i} value={value}>
                {filter.name}
              </option>
            ))
          )}
        </select>
      </div>
    </div>
  );
}

export { FilterDirections };
