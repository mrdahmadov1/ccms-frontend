import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';
import { getComplaint } from '../complaintSlice';

const API_BASE_URL = 'https://ccms-e9c8c215d52e.herokuapp.com/api/v1/responses';

export const createResponse = createAsyncThunk(
  'response/create',
  async (credentials, { dispatch }) => {
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

    const createdResponse = await response.json();

    dispatch(getComplaint(credentials.complaintId));

    return createdResponse;
  }
);

export const updateResponseRating = createAsyncThunk(
  'response/update',
  async ({ complaintId, responseId, credentials }, { dispatch }) => {
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

    dispatch(getComplaint(complaintId));

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
        state.response = action.payload.data;
        state.status = action.payload.status;
        state.error = action.payload.status !== 'success' ? action.payload.message : null;
      });
  },
});

export default responseSlice.reducer;
