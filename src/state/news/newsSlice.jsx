import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: {},
  isLoading: false,
};
const newsSlice = createSlice({
  name: "stockData",
  initialState,
});

export default newsSlice.reducer;
