import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';

const API_BASE_URL = 'https://ccms-e9c8c215d52e.herokuapp.com/api/v1/complaints';

export const createComplaint = createAsyncThunk('complaint/create', async (credentials) => {
  const token = Cookies.get('jwt');

  const response = await fetch(`${API_BASE_URL}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(credentials),
  });

  if (!response.ok) {
    const { error } = await response.json();
    return error;
  }

  return await response.json();
});

const complaintSlice = createSlice({
  name: 'complaint',
  initialState: {
    complaints: [],
    complaint: null,
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createComplaint.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(createComplaint.fulfilled, (state, action) => {
        console.log('create complaint action payload', action.payload);
        state.complaint = action.payload.data;
        state.status = action.payload.status;
        state.error = action.payload.status !== 'success' ? action.payload.message : null;
      });
  },
});

export default complaintSlice.reducer;
