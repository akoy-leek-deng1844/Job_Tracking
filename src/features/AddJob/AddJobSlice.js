import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import customFetch, { checkUnauthorizedResponse } from "../../utils/axios";
import { logoutUser } from "../user/userSlice";
import { toast } from "react-toastify";
import { getUserFromLocalStorage } from "../../utils/localStorage";
import { getAllJobs, hideLoading, showLoading } from "../AllJobs/AllJobsSlice";

const initialState = {
  isLoading: false,
  position: "",
  company: "",
  jobLocation: "",
  jobTypeOptions: ["full-time", "part-time", "remote", "internship"],
  jobType: "full-time",
  statusOptions: ["interview", "declined", "pending"],
  status: "pending",
  isEditing: false,
  editJobId: "",
};

export const createJob = createAsyncThunk("jobs/createJob", async (job, thunkAPI) => {
  try {
    const resp = await customFetch.post("/jobs", job, {
      headers: {
        Authorization: `Bearer ${thunkAPI.getState().userState.user.token}`,
      },
    });
    thunkAPI.dispatch(clearValues());
    return resp.data;
  } catch (error) {
    if (error.response.status === 401) {
      thunkAPI.dispatch(logoutUser());
      return thunkAPI.rejectWithValue("unauthorized, logging you out...");
    }
      return checkUnauthorizedResponse(error, thunkAPI);

  }
});

export const deleteJob = createAsyncThunk('job/deleteJob', async (jobId, thunkAPI) => {
  thunkAPI.dispatch(showLoading())
  try {
    const response = await customFetch.delete(`/jobs/${jobId}`, {
      headers: {
        Authorization: `Bearer ${thunkAPI.getState().userState.user.token}`
      }
    })
    thunkAPI.dispatch(getAllJobs())
    return response.data.msg;

  } catch (error) {
    thunkAPI.dispatch(hideLoading())
        return checkUnauthorizedResponse(error, thunkAPI);

  }
})
export const editJob = createAsyncThunk('job/editJob', async ({ jobId, job }, thunkAPI) => {
  try {
    const response = await customFetch.patch(`/jobs/${jobId}`, job, {
      headers: {
        Authorization: `Bearer ${thunkAPI.getState().userState.user.token}`
      }
    })
    thunkAPI.dispatch(clearValues())
    return response.data
  } catch (error) {
    return checkUnauthorizedResponse(error, thunkAPI)
  }
})
const jobSlice = createSlice({
    name: 'job',
  initialState,
  reducers: {
    handleJobInputs: (state, {payload: {name, value}}) => {
      state[name] = value;
    },
    clearValues: () => {
      return { ...initialState, jobLocation: getUserFromLocalStorage()?.location || '' }
    },
    setEditJob: (state, {payload}) => {
      return {...state, isEditing:true, ...payload}
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(createJob.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createJob.fulfilled, (state) => {
        state.isLoading = false;
        toast.success("Job created");
      })
      .addCase(createJob.rejected, (state, {payload}) => {
        state.isLoading = false;
        toast.error(payload);
      })
      .addCase(editJob.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(editJob.fulfilled, (state) => {
        state.isLoading = false;
        toast.success("Job modified..");
      })
      .addCase(editJob.rejected, (state, {payload}) => {
        state.isLoading = false;
        toast.error(payload);
      })
      .addCase(deleteJob.fulfilled, (state, { payload }) => {
        toast.success(payload);
      })
      .addCase(deleteJob.rejected, ({ payload }) => {
        toast.error(payload);
      });
  }
});
export const { handleJobInputs, clearValues, setEditJob} = jobSlice.actions;
export default jobSlice.reducer;