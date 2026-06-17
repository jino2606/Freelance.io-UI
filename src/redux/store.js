import { configureStore } from '@reduxjs/toolkit';
import getPostsSlice from '../pages/homePage/getPostsSlice';

const store = configureStore({
  reducer: {
    jobPostReducer: getPostsSlice
  }
});

export default store;