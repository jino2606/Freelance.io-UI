import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { commomAPI } from "../../services/commonApi"
import { BASE_URL } from "../../services/baseUrl"


/* Api to get user data using */
export const getUserData = createAsyncThunk('get/getCurrentUser', async(id, reqHeader)=>{
    console.log("updating the session");
    const result =  commomAPI("GET",`${BASE_URL}/user/${id}`,"", reqHeader)
    console.log("dataesd the session", result);
    return result
})

const sessionUpdater = createSlice({
    name: 'jobPostsSlice',
    initialState : {
        /* To hold the api calls DATA. As the promise contains three states like pending resolve and reject, so we added loading, response and error as respectively */
        loading: false,
        response: [],
        error: ""
    },

    extraReducers: (builder)=>{
        builder.addCase(getUserData.pending, (state)=>{
            state.loading = true
        })

        builder.addCase(getUserData.fulfilled, (state, action)=>{
            state.loading = false /* Got Response */
            state.response = action.payload
            state.error = ""

            // Assuming that the action.payload contains the user data
            const userData = action.payload;

            // Update session here
            sessionStorage.setItem("loggedInUser", JSON.stringify(userData));
        })

        builder.addCase(getUserData.rejected, (state, action)=>{
            state.loading = false
            state.response = []
            state.error = action.error.message
        })
    }
})

export default sessionUpdater.reducer