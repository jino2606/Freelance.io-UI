import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { commomAPI } from "../../services/commonApi"
import { BASE_URL } from "../../services/baseUrl"

/* Api to get user data using */
export const getJobPosts = createAsyncThunk('jobposts/getJobPosts', async(reqHeader)=>{
    const result = await commomAPI('GET', `${BASE_URL}/job/post`, "", reqHeader)
    return result.data
})

const jobPostsSlice = createSlice({
    name: 'jobPostsSlice',
    initialState : {
        /* To hold the api calls DATA. As the promise contains three states like pending resolve and reject, so we added loading, response and error as respectively */
        loading: false,
        response: [],
        error: ""
    },

    extraReducers: (builder)=>{
        builder.addCase(getJobPosts.pending, (state)=>{
            state.loading = true
        })

        builder.addCase(getJobPosts.fulfilled, (state, action)=>{
            state.loading = false /* Got Response */
            state.response = action.payload
            state.error = ""
        })

        builder.addCase(getJobPosts.rejected, (state, action)=>{
            state.loading = false
            state.response = []
            state.error = action.error.message
        })
    }
})

export default jobPostsSlice.reducer