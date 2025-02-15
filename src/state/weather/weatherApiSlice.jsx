import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_BASE_URL, API_KEY } from "./constants";

export const weatherApi = createApi({
  reducerPath: "weatherApi",
  baseQuery: fetchBaseQuery({ baseUrl: API_BASE_URL }),
  endpoints: (builder) => ({
    getWeatherData: builder.query({
      query: ({ city, lat, lon, type }) => {
        if (lat && lon) {
          return `${type}?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`;
        } else if (city) {
          return `${type}?q=${city}&units=metric&appid=${API_KEY}`;
        }
        return "";
      },
    }),

    getWeatherDataForDashboard: builder.query({
      async queryFn(locations, _queryApi, _extraOptions, fetchWithBQ) {
        if (!Array.isArray(locations) || locations.length === 0) {
          return { error: "Invalid or empty location array" };
        }

        try {
          const requests = locations.map(({ lat, lon }) =>
            fetchWithBQ(
              `/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`
            ).then((response) => response.data)
          );

          const results = await Promise.all(requests);

          return { data: results };
        } catch (error) {
          return { error: error.message };
        }
      },
    }),

    getCitySuggestion: builder.query({
      query: ({ city }) =>
        `find?q=${city}&type=like&sort=population&cnt=10&appid=${API_KEY}`,
    }),
  }),
});

export const {
  useGetWeatherDataQuery,
  useGetCitySuggestionQuery,
  useGetWeatherDataForDashboardQuery,
} = weatherApi;
