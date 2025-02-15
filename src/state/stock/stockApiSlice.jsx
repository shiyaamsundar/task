import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_SEARCH, API_URL, API_URL_BULK, API_URL_SUFFIX } from "./constants";

export const stockApi = createApi({
  reducerPath: "stockApi",
  baseQuery: fetchBaseQuery({ baseUrl: API_URL }),
  endpoints: (builder) => ({
    getStockData: builder.query({
      query: (obj) =>
        `query?function=${obj.url}&symbol=${obj.symbol}${API_URL_SUFFIX}`,
    }),
    getStockSearchData: builder.query({
      query: (symbol) =>
        `query?function=${API_SEARCH}&keywords=${symbol}${API_URL_SUFFIX}`,
    }),
  }),
});

export const { useGetStockDataQuery, useGetStockSearchDataQuery } = stockApi;
