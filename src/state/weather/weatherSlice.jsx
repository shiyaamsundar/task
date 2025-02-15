import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: {},
  isLoading: false,
};
const weatherSlice = createSlice({
  name: "weatherData",
  initialState,
});

export default weatherSlice.reducer;
