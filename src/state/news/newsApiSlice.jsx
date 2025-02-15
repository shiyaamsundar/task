import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_KEY, API_SEARCH, API_TOP_HEADLINES, API_URL } from "./constants";

export const newsApi = createApi({
  reducerPath: "newsApi",
  baseQuery: fetchBaseQuery({ baseUrl: API_URL }),
  endpoints: (builder) => ({
    getNewsData: builder.query({
      query: () => `${API_TOP_HEADLINES}?country=us&apiKey=${API_KEY}`,
    }),
    getNewsCategoryData: builder.query({
      query: (category) =>
        `${API_TOP_HEADLINES}?country=us&category=${category}&apiKey=${API_KEY}`,
    }),
    getNewsSearchData: builder.query({
      query: ({ query }) =>
        `${API_SEARCH}?q=${query}&sortBy=popularity&apiKey=${API_KEY}`,
    }),
  }),
});

export const {
  useGetNewsCategoryDataQuery,
  useGetNewsDataQuery,
  useGetNewsSearchDataQuery,
} = newsApi;
