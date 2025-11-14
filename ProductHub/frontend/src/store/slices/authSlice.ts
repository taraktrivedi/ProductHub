import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = '/api';

// Mock auth state
let currentUser = {
  id: 1,
  email: 'john.doe@example.com',
  firstName: 'John',
  lastName: 'Doe',
  role: 'product-manager',
  avatar: 'JD'
};

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: currentUser,
    token: 'mock-jwt-token',
    isAuthenticated: true,
    loading: false,
    error: null
  },
  reducers: {
    login: (state, action) => {
      const { user, token } = action.payload;
      state.user = user;
      state.token = token;
      state.isAuthenticated = true;
      state.error = null;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.error = null;
    },
    updateUser: (state, action) => {
      state.user = { ...state.user, ...action.payload };
    },
    clearError: (state) => {
      state.error = null;
    }
  }
});

export const { login, logout, updateUser, clearError } = authSlice.actions;

export default authSlice.reducer;