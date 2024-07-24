
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchActivityCards = createAsyncThunk(
  'activityCard/fetchActivityCards',
  async () => {
    const response = await axios.get('http://localhost:4000/activityCardData');
    return response.data;
  }
);

const activitySlice = createSlice({
  name: 'activity',
  initialState: {
    cards: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchActivityCards.pending, (state) => {
        state.loading = true;
        console.log('Fetched activity pending:');
      })
      .addCase(fetchActivityCards.fulfilled, (state, action) => {
        state.loading = false;
        state.cards = action.payload;
        console.log('Fetched activity cards:', action.payload);
      })
      .addCase(fetchActivityCards.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
        console.log('Fetched activity cards:', action.error.message);
      });
  },
});

export default activitySlice.reducer;
