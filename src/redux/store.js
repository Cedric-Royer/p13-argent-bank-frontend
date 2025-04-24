import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import { authApi } from './authApi';
import { profileApi } from './profileApi';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    [authApi.reducerPath]: authApi.reducer,
    [profileApi.reducerPath]: profileApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      authApi.middleware,
      profileApi.middleware
    ),
});