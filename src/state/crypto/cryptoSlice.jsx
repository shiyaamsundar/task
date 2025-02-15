import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: {},
  currency: "usd",
  isLoading: false,
};
const cryptoSlice = createSlice({
  name: "stockData",
  initialState,
  reducers: {
    updateCurrency: (state, action) => {
      state.currency = action.payload;
    },
  },
});

export const { updateCurrency } = cryptoSlice.actions;

export default cryptoSlice.reducer;
