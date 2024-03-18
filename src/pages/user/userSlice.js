import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { commomAPI } from "../../services/commonApi"
import { BASE_URL } from "../../services/baseUrl"

/* Api to get user data using */
export const updateUserData = createAsyncThunk('update/userData', async()=>{
    const result = commomAPI('PUT', `${BASE_URL}/users`)
    return result.data
})

const userDataSlice = createSlice({
    name: 'userDataSlice',
    initialState : {
        /* To hold the api calls DATA. As the promise contains three states like pending resolve and reject, so we added loading, response and error as respectively */
        loading: false,
        response: [],
        error: ""
    },

    extraReducers: (builder)=>{
        builder.addCase(updateUserData.pending, (state)=>{
            state.loading = true
        })

        builder.addCase(updateUserData.fulfilled, (state, action)=>{
            state.loading = false /* Got Response */
            state.response = action.payload
            state.error = ""
        })

        builder.addCase(updateUserData.rejected, (state, action)=>{
            state.loading = false
            state.response = []
            state.error = action.error.message
        })
    }
})