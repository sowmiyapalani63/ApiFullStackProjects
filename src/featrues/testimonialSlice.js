import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Fetch 
export const fetchTestimonials = createAsyncThunk(
  'testimonials/fetchTestimonials',
  async () => {
    const response = await axios.get('http://localhost:4000/testimonial');
    return response.data;
  }
);

// Update
export const updateTestimonial = createAsyncThunk('testimonials/updateTestimonial',
   async (updatedTestimonial) => {
  const response = await axios.put(`http://localhost:4000/testimonial/${updatedTestimonial.id}`, updatedTestimonial);
  return response.data;
});
//New
export const addTestimonial = createAsyncThunk(
  'testimonials/addTestimonial',
  async (testimonialData, { rejectWithValue }) => {
    try {
      const response = await axios.post('http://localhost:4000/testimonial', testimonialData);
      return response.data;
    } catch (error) {
      console.error('Error adding testimonial:', error);
      return rejectWithValue(error.response.data);
    }
  }
);
//Delete
export const deleteTestimonial = createAsyncThunk(
  'testimonials/deleteTestimonial',
  async (id, { rejectWithValue }) => {
    try {
      await axios.delete(`http://localhost:4000/testimonial/${id}`);
      return id; 
    } catch (error) {
      console.error('Error deleting testimonial:', error);
      return rejectWithValue(error.response.data);
    }
  }
);


const testimonialSlice = createSlice({
  name: 'testimonials',
  initialState: {
    testimonials: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTestimonials.pending, (state) => {
        state.loading = true;
        console.log('Fetching testimonials: pending');
      })
      .addCase(fetchTestimonials.fulfilled, (state, action) => {
        state.loading = false;
        state.testimonials = action.payload;
        console.log('Fetched testimonials:', action.payload);
      })
      .addCase(fetchTestimonials.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
        console.log('Failed to fetch testimonials:', action.error.message);
      })
      .addCase(updateTestimonial.fulfilled, (state, action) => {
        const index = state.testimonials.findIndex(testimonial => testimonial.id === action.payload.id);
        if (index !== -1) {
          state.testimonials[index] = action.payload;
        }
      })
      .addCase(updateTestimonial.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        console.error('Update testimonial rejected:', action.payload);
      })
      .addCase(addTestimonial.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addTestimonial.fulfilled, (state, action) => {
        state.loading = false;
        state.testimonials.push(action.payload);
      })
      .addCase(addTestimonial.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteTestimonial.fulfilled, (state, action) => {
        state.testimonials = state.testimonials.filter(testimonial => testimonial.id !== action.payload);
      })
      .addCase(deleteTestimonial.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        console.error('Delete testimonial rejected:', action.payload);
      })
      // .addCase(updateTestimonial.pending, (state) => {
      //   state.loading = true;
      //   console.log('Updating testimonial: pending');
      // })
      // .addCase(updateTestimonial.fulfilled, (state, action) => {
      //   state.loading = false;
      //   state.testimonials = state.testimonials.map(testimonial =>
      //     testimonial.id === action.payload.id ? action.payload : testimonial
      //   );
      //   console.log('Updated testimonial:', action.payload);
      // })
      // .addCase(updateTestimonial.rejected, (state, action) => {
      //   state.loading = false;
      //   state.error = action.error.message;
      //   console.log('Failed to update testimonial:', action.error.message);
      // });
  },
});

export const { actions, reducer } = testimonialSlice;
export default reducer;
