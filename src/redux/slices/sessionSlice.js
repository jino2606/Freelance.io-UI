import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { commomAPI } from "../../services/commonApi"
import { BASE_URL } from "../../services/baseUrl"


const sessionSlice = createSlice({
    name: 'session',
    initialState: null,

    reducers:{
        setCurrentUser: (state, action)=>{
            // return [...state, action.payload]
            return state = action.payload
        }
    }
})

export const {setCurrentUser} = sessionSlice.actions
export default sessionSlice.reducer