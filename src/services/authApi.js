import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { apiKeyAuth, authUrl } from "../firebase";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({ baseUrl: authUrl }),
  endpoints: (builder) => ({
    signUp: builder.mutation({
      query: ({ ...auth }) => ({
        url: `accounts:signUp?key=${apiKeyAuth}`,
        method: "POST",
        body: auth,
      }),
    }),
    login: builder.mutation({
      query: ({ ...auth }) => ({
        url: `accounts:signInWithPassword?key=${apiKeyAuth}`,
        method: "POST",
        body: auth,
      }),
    }),
  }),
});

export const { useLoginMutation, useSignUpMutation } = authApi;
