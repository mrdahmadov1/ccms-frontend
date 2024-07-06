import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';
import { getMyComplaints } from '../complaintSlice';

const API_BASE_URL = 'https://ccms-e9c8c215d52e.herokuapp.com/api/v1/responses';

export const createResponse = createAsyncThunk('response/create', async (credentials) => {
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

export const updateResponseRating = createAsyncThunk(
  'response/update',
  async ({ responseId, credentials }, { dispatch }) => {
    const token = Cookies.get('jwt');

    const response = await fetch(`${API_BASE_URL}/${responseId}`, {
      method: 'PATCH',
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

    const updatedResponse = await response.json();

    dispatch(getMyComplaints());

    return updatedResponse;
  }
);

const responseSlice = createSlice({
  name: 'response',
  initialState: {
    response: null,
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createResponse.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(createResponse.fulfilled, (state, action) => {
        state.response = action.payload.data;
        state.status = action.payload.status;
        state.error = action.payload.status !== 'success' ? action.payload.message : null;
      })
      .addCase(updateResponseRating.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(updateResponseRating.fulfilled, (state, action) => {
        console.log(action.payload);
        state.response = action.payload.data;
        state.status = action.payload.status;
        state.error = action.payload.status !== 'success' ? action.payload.message : null;
      });
  },
});

export default responseSlice.reducer;
