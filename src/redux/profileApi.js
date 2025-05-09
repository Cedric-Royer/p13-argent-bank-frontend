import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {API_URL, API_PROFILE} from '../config.js'

export const profileApi = createApi({
  reducerPath: 'profileApi',
  baseQuery: fetchBaseQuery({
    baseUrl: API_URL,
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.token;
      if (token) headers.set('Authorization', `Bearer ${token}`);
      return headers;
    },
  }),
  endpoints: (builder) => ({
    fetchUserProfile: builder.query({
      query: () => ({ url: API_PROFILE, method: 'POST' }),
    }),
    updateUserProfile: builder.mutation({
      query: (data) => ({ url: API_PROFILE, method: 'PUT', body: data }),
    }),
  }),
});

export const { useFetchUserProfileQuery, useUpdateUserProfileMutation } = profileApi;
