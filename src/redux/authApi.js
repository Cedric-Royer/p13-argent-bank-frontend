import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {API_URL, API_LOGIN} from '../config.js'

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({ baseUrl: API_URL }),
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: API_LOGIN,
        method: 'POST',
        body: credentials,
      }),
    }),
  }),
});

export const { useLoginMutation } = authApi;
