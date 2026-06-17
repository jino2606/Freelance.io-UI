import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { API_URL } from '../../services/baseUrl';
import api from '../../services/commonApi';

export const getJobPosts = createAsyncThunk('jobposts/getJobPosts', async (params = {}) => {
  const result = await api.get(`${API_URL}/job/post`, { params });
  return result.data;
});

const jobPostsSlice = createSlice({
  name: 'jobPostsSlice',
  initialState: { loading: false, response: [], error: '' },
  extraReducers: (builder) => {
    builder
      .addCase(getJobPosts.pending, (state) => { state.loading = true; })
      .addCase(getJobPosts.fulfilled, (state, action) => {
        state.loading = false;
        state.response = action.payload?.posts || action.payload || [];
        state.error = '';
      })
      .addCase(getJobPosts.rejected, (state, action) => {
        state.loading = false;
        state.response = [];
        state.error = action.error.message;
      });
  }
});

export default jobPostsSlice.reducer;