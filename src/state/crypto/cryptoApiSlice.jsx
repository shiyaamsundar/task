import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_KEY, API_URL } from "./constants";

export const cryptoApi = createApi({
  reducerPath: "cryptoApi",
  baseQuery: fetchBaseQuery({ baseUrl: API_URL }),
  endpoints: (builder) => ({
    getCryptos: builder.query({
      query: ({ currency }) => ({
        url: `coins/markets?vs_currency=${currency}&category=layer-1&order=market_cap_desc&sparkline=false`,
        headers: {
          accept: "application/json",
          "x-cg-demo-api-key": API_KEY,
        },
      }),
    }),
    getCryptoChart: builder.query({
      query: ({ id, days, currency }) => ({
        url: `/coins/${id}/market_chart?vs_currency=${currency}&days=${days}&interval=daily`,
        headers: {
          accept: "application/json",
          "x-cg-demo-api-key": API_KEY,
        },
      }),
    }),
    getCryptoDetails: builder.query({
      query: (id) => ({
        url: `/coins/${id}?localization=true&tickers=false&market_data=true&community_data=false&developer_data=false&sparkline=false`,
        headers: {
          accept: "application/json",
          "x-cg-demo-api-key": API_KEY,
        },
      }),
    }),
    getCryptoDetailsForDashboard: builder.query({
      async queryFn(ids, _queryApi, _extraOptions, fetchWithBQ) {
        try {
          const requests = ids.map((id) =>
            fetchWithBQ(
              `/coins/${id}?localization=true&tickers=false&market_data=true&community_data=false&developer_data=false&sparkline=false`,
              {
                headers: {
                  accept: "application/json",
                  "x-cg-demo-api-key": API_KEY,
                },
              }
            ).then((response) => response.data)
          );
          const results = await Promise.all(requests);
          return { data: results };
        } catch (error) {
          return { error: error.message };
        }
      },
    }),
    getTrendingCoins: builder.query({
      query: (currency) => ({
        url: `/coins/markets?vs_currency=${currency}&order=gecko_desc&per_page=10&page=1&sparkline=false&price_change_percentage=24h`,
        headers: {
          accept: "application/json",
          "x-cg-demo-api-key": API_KEY,
        },
      }),
    }),
  }),
});

export const {
  useGetCryptoChartQuery,
  useGetCryptoDetailsQuery,
  useGetCryptosQuery,
  useGetTrendingCoinsQuery,
  useGetCryptoDetailsForDashboardQuery,
} = cryptoApi;
export default cryptoApi;
