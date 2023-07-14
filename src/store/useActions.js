import { bindActionCreators } from "@reduxjs/toolkit"
import { useMemo } from "react"
import { useDispatch } from "react-redux"
import { getCurrencies, filterCurrencies, filterCurrenciesDirection } from "./currenciesReducer"

const rootActions = {
    getCurrencies,
    filterCurrencies,
    filterCurrenciesDirection
}

export const useActions = () => {
    const dispatch = useDispatch()

    return useMemo(() => bindActionCreators(rootActions, dispatch), [dispatch])
}