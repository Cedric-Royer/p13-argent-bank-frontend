import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import { authApi } from './authApi';
import storage from 'redux-persist/lib/storage'; 

import { persistStore, persistReducer } from 'redux-persist';

const persistConfig = {
  key: 'auth',
  storage,
  whitelist: ['auth'], 
};

const persistedReducer = persistReducer(persistConfig, authReducer);

export const store = configureStore({
  reducer: {
    auth: persistedReducer, 
    [authApi.reducerPath]: authApi.reducer, 
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
      },
    }).concat(authApi.middleware),
});

export const persistor = persistStore(store);
