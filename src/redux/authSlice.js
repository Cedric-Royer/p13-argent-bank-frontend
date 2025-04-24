import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  token: null,
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
      localStorage.setItem('logout-event', Date.now());
      localStorage.removeItem('authToken');
      sessionStorage.removeItem('authToken');
    },
    forceLogout() {
      sessionStorage.removeItem('authToken');
      localStorage.removeItem('authToken');
      return initialState; 
    },
    checkAuthentication(state) {
      const token = localStorage.getItem('authToken') || sessionStorage.getItem('authToken');
      if (token) {
        state.token = token;
        state.isConnected = true;
        state.wasLoggedOut = false; 
      } else {
        state.token = null;
        state.isConnected = false;
        state.rememberMe = false;
      }
    },
  },
});

export const { login, logout, forceLogout, checkAuthentication } = authSlice.actions;
export default authSlice.reducer;
