import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    directionsData: [],
    filterData: [],
    currenciesDirections: "",
    currenciesFilter: ""
}

const currenciesStore = createSlice({
    name: "currencies",
    initialState,
    reducers: {
        getCurrencies: (state, action) => {
            state.directionsData = action.payload.directions
            state.filterData = action.payload.filter
        },
        filterCurrenciesDirection: (state, action) => {
            state.currenciesDirections = action.payload
        },
        filterCurrencies: (state, action) => {
            state.currenciesFilter = action.payload
        }
    }
})

export const { reducer: currenciesReducer } = currenciesStore
export const { getCurrencies, filterCurrenciesDirection, filterCurrencies } = currenciesStore.actions