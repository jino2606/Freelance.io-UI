import { configureStore } from "@reduxjs/toolkit";
import sessionSlice from "./slices/sessionSlice";
import getPostsSlice from "../pages/homePage/getPostsSlice";
import sessionUpdaterSlice from "./slices/sessionUpdaterSlice";

const store = configureStore({
    reducer:{
        sessionReducer:sessionSlice,
        jobPostReducer:getPostsSlice,
        sessionUpdateReducer:sessionUpdaterSlice
    }
})

export default store