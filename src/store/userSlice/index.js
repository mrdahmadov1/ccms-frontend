import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

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

  return response.json();
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

  return response.json();
});

export const logoutUser = createAsyncThunk('user/logout', async () => {
  const response = await fetch(`${API_BASE_URL}/logout`, {
    method: 'POST',
  });

  if (!response.ok) {
    const { error } = await response.json();
    return error;
  }

  return response.json();
});

const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: null,
    status: 'idle',
    error: null,
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
        state.status = action.payload.status;
        state.error = action.payload.status !== 'success' ? action.payload : null;
      })
      .addCase(loginUser.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = action.payload.data;
        state.status = action.payload.status;
        state.error = action.payload.status !== 'success' ? action.payload : null;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.status = 'idle';
        state.error = null;
      });
  },
});

export default userSlice.reducer;
