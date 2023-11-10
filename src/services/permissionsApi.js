import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseUrl } from "../firebase";

export const permissionsApi = createApi({
  reducerPath: "permissionsApi",
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    getProfileImage: builder.query({
      query: (localId) => `profileImages/${localId}.json`,
    }),
    postProfileImage: builder.mutation({
      query: ({ image, localId }) => ({
        url: `profileImages/${localId}.json`,
        method: "PUT",
        body: {
          image: image,
        },
      }),
    }),
  }),
});

export const { useGetProfileImageQuery, usePostProfileImageMutation } =
  permissionsApi;
