import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: {},
  stockList: {
    RELIANCE: false,
    TCS: false,
    HDFCBANK: false,
    INFY: false,
  },
  isLoading: false,
};
const stockSlice = createSlice({
  name: "stockData",
  initialState,
  reducers: {
    updateSelectedStock: (state, action) => {
      state.stockList = action.payload;
    },
  },
});

export const { updateSelectedStock } = stockSlice.actions;

export default stockSlice.reducer;
