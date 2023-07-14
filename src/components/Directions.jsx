import { useCallback, useEffect, useRef, useState } from "react"
import { useSelector } from "react-redux"
import styles from "../css/currencies_styles.module.scss"

function Directions({
	directionsData,
	setFilterFrom,
	filterCurrenciesDirection,
	filterCurrencies,
	setCurrenciesValue,
	value,
	setValue
}) {
	const [dirCurrencies, setDirCurrencies] = useState(directionsData)
	const currenciesDirections = useSelector(
		state => state.currencies.currenciesDirections
	)
	const selectRef = useRef(null)

	useEffect(() => {
		setDirCurrencies(directionsData)
	}, [directionsData])

	useEffect(() => {
		switch (currenciesDirections) {
			case "crypto":
				setDirCurrencies(
					directionsData.filter(
						d => ["BTC", "ETH", "USDTTRC"].indexOf(d.code) !== -1
					)
				)
				break
			case "cash":
				setDirCurrencies(
					directionsData.filter(
						d => ["CASHUSD", "CASHRUB"].indexOf(d.code) !== -1
					)
				)
				break
			case "banksRUB":
			case "banksUAH":
				setDirCurrencies(
					directionsData.filter(
						d => ["ACRUB", "SBERRUB", "TCSBRUB"].indexOf(d.code) !== -1
					)
				)
				break
			default:
				setDirCurrencies(directionsData)
		}
	}, [currenciesDirections])

	useEffect(() => {
		if (selectRef.current.options[selectRef.current.selectedIndex]) {
			setFilterFrom(
				selectRef.current.options[selectRef.current.selectedIndex].value
			)
		}
	})

	useEffect(() => {
		const oao = () => {
			if (selectRef.current.options[selectRef.current.selectedIndex]) {
				selectRef.current.options[selectRef.current.selectedIndex].textContent =
					value
			}
		}
		oao()
	}, [value])

	const handleChangeValue = useCallback(e => {
		setFilterFrom(e.target.options[e.target.selectedIndex].value)
		setValue(e.target.options[e.target.selectedIndex].textContent)
		filterCurrencies("")
	}, [])

	const handleCurrVal = useCallback(e => {
		let target = parseInt(e.target.value, 10)
		setCurrenciesValue(!!target && target)
	}, [])

	return (
		<>
			<div className={styles.header}>Отдаете</div>
			<div className={styles.filterCurr}>
				<button
					onClick={() => filterCurrenciesDirection("")}
					className={currenciesDirections === "" ? styles.selectFilter : ``}
				>
					Все
				</button>

				<button
					onClick={() => filterCurrenciesDirection("crypto")}
					className={
						currenciesDirections === "crypto" ? styles.selectFilter : ``
					}
				>
					Криптовалюты
				</button>

				<button
					onClick={() => filterCurrenciesDirection("cash")}
					className={currenciesDirections === "cash" ? styles.selectFilter : ``}
				>
					Наличные
				</button>

				<button
					onClick={() => filterCurrenciesDirection("banksRUB")}
					className={
						currenciesDirections === "banksRUB" ? styles.selectFilter : ``
					}
				>
					Банки RUB
				</button>

				<button
					onClick={() => filterCurrenciesDirection("banksUAH")}
					className={
						currenciesDirections === "banksUAH" ? styles.selectFilter : ``
					}
				>
					Банки UAH
				</button>
			</div>

			<div>
				<input
					type="text"
					onChange={handleCurrVal}
					placeholder="1000 - 495000"
				/>

				<select ref={selectRef} onChange={handleChangeValue}>
					{dirCurrencies.map((direction, i) => (
						<option key={i} value={value}>
							{direction.name}
						</option>
					))}
				</select>
			</div>
		</>
	)
}

export { Directions }
