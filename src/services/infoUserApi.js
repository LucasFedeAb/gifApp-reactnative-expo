import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseUrl } from "../firebase";

export const infoUserApi = createApi({
  reducerPath: "infoUserApi",
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    getInfoUser: builder.query({
      query: (localId) => `infoUser/${localId}.json`,
    }),
    postInfoUser: builder.mutation({
      query: ({ image, username, localId }) => ({
        url: `infoUser/${localId}.json`,
        method: "PUT",
        body: {
          image: image,
          username: username,
        },
      }),
    }),
  }),
});

export const { usePostInfoUserMutation, useGetInfoUserQuery } = infoUserApi;
