import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';

const API_BASE_URL = 'https://ccms-e9c8c215d52e.herokuapp.com/api/v1/complaints';

export const getAllComplaints = createAsyncThunk('complaint/getAllComplaints', async () => {
  const token = Cookies.get('jwt');

  const response = await fetch(`${API_BASE_URL}/all`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const { error } = await response.json();
    return error;
  }

  return await response.json();
});

export const getMyComplaints = createAsyncThunk('complaint/getMyComplaints', async () => {
  const token = Cookies.get('jwt');

  const response = await fetch(`${API_BASE_URL}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const { error } = await response.json();
    return error;
  }

  return await response.json();
});

export const getComplaint = createAsyncThunk('complaint/getComplaint', async (complaintId) => {
  const token = Cookies.get('jwt');

  const response = await fetch(`${API_BASE_URL}/${complaintId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const { error } = await response.json();
    return error;
  }

  return await response.json();
});

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

export const updateComplaint = createAsyncThunk(
  'complaint/update',
  async ({ complaintId, credentials }, { dispatch }) => {
    const token = Cookies.get('jwt');

    const response = await fetch(`${API_BASE_URL}/${complaintId}`, {
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

    const updatedComplaint = await response.json();

    dispatch(getAllComplaints());

    return updatedComplaint;
  }
);

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
        state.complaint = action.payload.data;
        state.status = action.payload.status;
        state.error = action.payload.status !== 'success' ? action.payload.message : null;
      })
      .addCase(updateComplaint.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(updateComplaint.fulfilled, (state, action) => {
        state.complaint = action.payload.data;
        state.status = action.payload.status;
        state.error = action.payload.status !== 'success' ? action.payload.message : null;
      })
      .addCase(getComplaint.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(getComplaint.fulfilled, (state, action) => {
        state.complaint = action.payload.data;
        state.status = action.payload.status;
        state.error = action.payload.status !== 'success' ? action.payload.message : null;
      })
      .addCase(getMyComplaints.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(getMyComplaints.fulfilled, (state, action) => {
        state.complaints = action.payload.data;
        state.status = action.payload.status;
        state.error = action.payload.status !== 'success' ? action.payload.message : null;
      })
      .addCase(getAllComplaints.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(getAllComplaints.fulfilled, (state, action) => {
        state.complaints = action.payload.data;
        state.status = action.payload.status;
        state.error = action.payload.status !== 'success' ? action.payload.message : null;
      });
  },
});

export default complaintSlice.reducer;
