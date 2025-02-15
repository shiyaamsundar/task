import { configureStore } from "@reduxjs/toolkit";
import weatherReducer from "./weather/weatherSlice";
import { weatherApi } from "./weather/weatherApiSlice";
import { stockApi } from "./stock/stockApiSlice";
import stockReducer from "./stock/stockSlice";
import { newsApi } from "./news/newsApiSlice";
import cryptoReducer from "./crypto/cryptoSLice";
import dashboardReducer from "./dashboard/dashboardSlice";
import { cryptoApi } from "./crypto/cryptoApiSlice";

export const store = configureStore({
  reducer: {
    weatherReducer: weatherReducer,
    stockReducer: stockReducer,
    cryptoReducer: cryptoReducer,
    dashboardReducer: dashboardReducer,
    [weatherApi.reducerPath]: weatherApi.reducer,
    [stockApi.reducerPath]: stockApi.reducer,
    [newsApi.reducerPath]: newsApi.reducer,
    [cryptoApi.reducerPath]: cryptoApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      weatherApi.middleware,
      stockApi.middleware,
      newsApi.middleware,
      cryptoApi.middleware
    ),
});

export default store;
