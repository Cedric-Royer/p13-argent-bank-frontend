import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const authApi = createApi({
  reducerPath: 'authApi', 
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:3001/api/v1/',
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.token; 
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    fetchUserProfile: builder.query({
      query: () => ({
        url: 'user/profile',
        method: 'POST',
      }),
    }),
    updateUserProfile: builder.mutation({
      query: (userData) => ({
        url: 'user/profile',
        method: 'PUT',
        body: userData,
      }),
    }),
    login: builder.mutation({
      query: (credentials) => ({
        url: 'user/login',
        method: 'POST',
        body: credentials,
      }),
    }),
  }),
});

export const { useFetchUserProfileQuery, useUpdateUserProfileMutation, useLoginMutation } = authApi;
