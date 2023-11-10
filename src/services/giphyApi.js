import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseUrlGiphy, apiKeyGiphy } from "../firebase";

export const giphyApi = createApi({
  reducerPath: "giphyApi",
  baseQuery: fetchBaseQuery({ baseUrl: baseUrlGiphy }),
  endpoints: (builder) => ({
    getGiphyBySearch: builder.query({
      query: ({ category, limit = 50, page = 0, lang = "en" }) =>
        `gifs/search?q=${category}&api_key=${apiKeyGiphy}&limit=${limit}&offset=${
          page * limit
        }&lang=${lang}`,
    }),
    getTrendingTerms: builder.query({
      query: () =>
        `trending/searches?api_key=${apiKeyGiphy}&country=Argentina&lang=es`,
    }),
  }),
});

export const { useGetGiphyBySearchQuery, useGetTrendingTermsQuery } = giphyApi;
