import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  token: null,
  loading: false,
  error: null,
  isConnected: false,
  wasLoggedOut: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login(state, action) {
      const { token, rememberMe } = action.payload;
      state.token = token;
      state.isConnected = true;
      state.wasLoggedOut = false;

      if (rememberMe) {
        localStorage.setItem('authToken', token);
      } else {
        sessionStorage.setItem('authToken', token);
      }
    },
    logout(state) {
      state.token = null;
      state.isConnected = false;
      state.wasLoggedOut = true;
      localStorage.removeItem('authToken');
      sessionStorage.removeItem('authToken');
    },

    checkAuthentication(state) {
      const token = localStorage.getItem('authToken') || sessionStorage.getItem('authToken');

      if (token) {
        state.token = token;
        state.isConnected = true; 
        state.wasLoggedOut = false;
      }
    },
  },
});

export const { login, logout, checkAuthentication } = authSlice.actions;
export default authSlice.reducer;
