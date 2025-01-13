import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  token: null,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login(state, action) {
      const { token, rememberMe } = action.payload;
      state.token = token;

      if (rememberMe) {
        localStorage.setItem('authToken', token);
      } else {
        sessionStorage.setItem('authToken', token);
      }
    },
    logout(state) {
      state.token = null;
      localStorage.removeItem('authToken');
      sessionStorage.removeItem('authToken');
    },

    checkAuthentication(state) {
      const token = localStorage.getItem('authToken') || sessionStorage.getItem('authToken');

      if (token) {
        state.token = token;

      }
    },
  },
});

export const { login, logout, checkAuthentication } = authSlice.actions;
export default authSlice.reducer;
