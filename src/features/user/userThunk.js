import customFetch, { checkUnauthorizedResponse } from "../../utils/axios";
import { clearValues } from "../AddJob/AddJobSlice";
import { clearStoreState } from "../AllJobs/AllJobsSlice";
import { logoutUser } from "./userSlice";


export const registerUserThunk = async (user, thunkAPI) => {
  try {
    const resp = await customFetch.post("/auth/register", user);
    return resp.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.msg);
  }
};
export const loginUserThunk = async (user, thunkAPI) => {
  try {
    const resp = await customFetch.post("/auth/login", user);
    return resp.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.msg);
  }
};
export const updateUserThunk = async (user, thunkAPI) => {
  try {
    const resp = await customFetch.patch("/auth/updateUser", user, {
      headers: {
        Authorization: `Bearer ${thunkAPI.getState().userState.user.token}`,
      },
    });
    return resp.data;
  } catch (error) {
    
      return checkUnauthorizedResponse(error, thunkAPI)
  }
};
export const clearUserStoreThunk = async (message, thunkAPI) => {
  try {
    thunkAPI.dispatch(clearValues());
    thunkAPI.dispatch(logoutUser(message));
    thunkAPI.dispatch(clearStoreState());
    return Promise.resolve();
  } catch (error) {
    return Promise.reject();
  }
};