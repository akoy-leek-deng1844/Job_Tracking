import { configureStore } from "@reduxjs/toolkit";
import userSliceReducer from "./features/user/userSlice";
import AddJobSliceReducer from "./features/AddJob/AddJobSlice";
import AllJobsSliceReducer from "./features/AllJobs/AllJobsSlice";

export const store = configureStore({
    reducer: {
        userState: userSliceReducer,
        jobState: AddJobSliceReducer,
        allJobsState: AllJobsSliceReducer,
    }
})