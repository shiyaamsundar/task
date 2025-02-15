import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: {},
  crypto: [],
  news: [],
  weather: [],
  isLoading: false,
};
const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {
    updateCryptoWishlist: (state, action) => {
      state.crypto = state.crypto.includes(action.payload)
        ? state.crypto.filter((id) => id !== action.payload)
        : [...state.crypto, action.payload];
    },
    updatenewsWishlist: (state, action) => {
      state.news = state.news.includes(action.payload)
        ? state.news.filter((id) => id !== action.payload)
        : [...state.news, action.payload];
    },
    updateweatherWishlist: (state, action) => {
      const exists = state.weather.some(
        (item) =>
          item.lat === action.payload.lat && item.lon === action.payload.lon
      );

      if (exists) {
        state.weather = state.weather.filter(
          (item) =>
            item.lat !== action.payload.lat || item.lon !== action.payload.lon
        );
      } else {
        state.weather = [...state.weather, action.payload];
      }
    },
  },
});

export const {
  updateCryptoWishlist,
  updatenewsWishlist,
  updateweatherWishlist,
} = dashboardSlice.actions;

export default dashboardSlice.reducer;
