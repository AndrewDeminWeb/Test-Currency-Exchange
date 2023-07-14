import { configureStore } from "@reduxjs/toolkit"
import { currenciesReducer } from "./currenciesReducer"

export const store = configureStore({
    reducer: {
        currencies: currenciesReducer
    },
    devTools: true
})