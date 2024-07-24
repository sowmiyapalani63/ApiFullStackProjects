import { configureStore } from '@reduxjs/toolkit';
import authSlice from './userAuthSlice';
import activitySlice from './activitySlice';
import testimonialReducer from './testimonialSlice';


export const store = configureStore({
  reducer: {
    auth: authSlice,
    activity: activitySlice ,
    testimonials: testimonialReducer
  }
});

export default store;
