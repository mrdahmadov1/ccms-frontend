import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';
import { resetComplaintState } from '../complaintSlice';

const API_BASE_URL = 'https://ccms-e9c8c215d52e.herokuapp.com/api/v1/users';

export const registerUser = createAsyncThunk('user/register', async (userData) => {
  const response = await fetch(`${API_BASE_URL}/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  });

  if (!response.ok) {
    const { message } = await response.json();
    return message;
  }

  return await response.json();
});

export const loginUser = createAsyncThunk('user/login', async (credentials) => {
  const response = await fetch(`${API_BASE_URL}/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(credentials),
  });

  if (!response.ok) {
    const { error } = await response.json();
    return error;
  }

  return await response.json();
});

export const checkLogin = createAsyncThunk('user/checkLogin', async () => {
  const token = Cookies.get('jwt');

  if (!token) {
    return { isLoggedIn: false };
  }

  const response = await fetch(`${API_BASE_URL}/checkLogin`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    return { isLoggedIn: false };
  }

  return await response.json();
});

export const logoutUser = createAsyncThunk('user/logout', async (_, { dispatch }) => {
  const response = await fetch(`${API_BASE_URL}/logout`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    const { error } = await response.json();
    return error;
  }

  dispatch(resetComplaintState());
  return await response.json();
});

const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: localStorage.getItem('user') || null,
    status: 'idle',
    error: null,
    isLoggedIn: localStorage.getItem('isLoggedIn') || false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.user = action.payload.data;
        localStorage.setItem('user', JSON.stringify(state.user));
        Cookies.set('jwt', action.payload.token);
        state.status = action.payload.status;
        state.error = action.payload.status !== 'success' ? action.payload : null;
      })
      .addCase(loginUser.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = action.payload.data;
        localStorage.setItem('user', JSON.stringify(state.user));
        Cookies.set('jwt', action.payload.token);
        state.status = action.payload.status;
        state.error = action.payload.status !== 'success' ? action.payload.message : null;
      })
      .addCase(checkLogin.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(checkLogin.fulfilled, (state, action) => {
        state.user = action.payload.data;
        localStorage.setItem('user', JSON.stringify(state.user));
        state.isLoggedIn = action.payload.status === 'success';
        localStorage.setItem('isLoggedIn', state.isLoggedIn);
        state.status = 'idle';
        state.error = null;
      })
      .addCase(checkLogin.rejected, (state) => {
        state.user = null;
        state.isLoggedIn = false;
        state.status = 'idle';
        state.error = null;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        localStorage.removeItem('user');
        localStorage.removeItem('isLoggedIn');
        Cookies.remove('jwt');
        state.status = 'idle';
        state.error = null;
      });
  },
});

export default userSlice.reducer;
