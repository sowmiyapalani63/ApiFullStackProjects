import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (credentials, { rejectWithValue }) => {
    console.log('Credentials received:', credentials);
    try {
      const response = await axios.get('http://localhost:4000/userauth/login', { params: credentials });
      console.log('Response received:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error response:', error.response.data);
      return rejectWithValue(error.response.data);
    }
  }
);

export const signupUser = createAsyncThunk(
  'auth/signupUser',
  async (credentials, { rejectWithValue }) => {
    console.log('Signup credentials received:', credentials);
    try {
      const response = await axios.post('http://localhost:4000/userauth/signup', credentials);
      console.log('Signup response received:', response.data);
      return response.data;
    } catch (error) {
      console.error('Signup error response:', error.response.data);
      return rejectWithValue(error.response.data);
    }
  }
);

export const logoutUser = createAsyncThunk(
  'auth/logoutUser',
  async (username, { rejectWithValue }) => {
    console.log('Logging out user:', username);
    try {
      const response = await axios.post('http://localhost:4000/userauth/logout', { username });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: JSON.parse(localStorage.getItem('user')) || null,
    loading: false,
    error: null
  },
  reducers: {
    logout(state, action) {
      state.user = null;
      localStorage.removeItem('user');
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        console.log('State after login fulfilled:', state.user);
        localStorage.setItem('user', JSON.stringify(action.payload.user));
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      })
      .addCase(signupUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signupUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        console.log('State after signup fulfilled:', state.user);
        localStorage.setItem('user', JSON.stringify(action.payload.user));
      })
      .addCase(signupUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      })
      .addCase(logoutUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(logoutUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = null;
        localStorage.removeItem('user');
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      });
  }
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
