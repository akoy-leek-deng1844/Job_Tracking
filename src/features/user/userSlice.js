import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { addUserToLocalStorage, getUserFromLocalStorage, removeUserFromLocalStorage } from "../../utils/localStorage";
import {
  clearUserStoreThunk,
  loginUserThunk,
  registerUserThunk,
  updateUserThunk,
} from "./userThunk";

const initialState = {
  user: getUserFromLocalStorage(),
  isSidebarOpen: false,
  isLoading: false,
  
};

export const registerUser = createAsyncThunk(
    "user/registerUser",
    
  registerUserThunk
);

export const loginUser = createAsyncThunk(
  "user/loginUser",
  
  loginUserThunk
);
export const updateUser = createAsyncThunk(
  "user/updateUser",
  
  updateUserThunk
);
export const clearStore = createAsyncThunk(
  "user/clearStore",
  clearUserStoreThunk
)
const userSlice = createSlice({
    name: 'user',
  initialState,
  reducers: {
    toggleSidebar: (state) => {
      state.isSidebarOpen = !state.isSidebarOpen;
    },
    logoutUser: (state, {payload}) => {
      state.user = null;
      removeUserFromLocalStorage();
      if (payload) {
        toast.success(payload)
      }
    }
    },
    extraReducers: (builder) => {
        builder
          .addCase(registerUser.pending, (state) => {
            state.isLoading = true;
          })
          .addCase(registerUser.fulfilled, (state, { payload }) => {
            state.isLoading = false;
            const { user } = payload;
            state.user = user;
            addUserToLocalStorage(user);
            toast.success(`Hello there ${user.name}`);
          })
          .addCase(registerUser.rejected, (state, { payload }) => {
            state.isLoading = false;
            toast.error(payload);
          })
          .addCase(loginUser.pending, (state) => {
            state.isLoading = true;
          })
          .addCase(loginUser.fulfilled, (state, { payload }) => {
            state.isLoading = false;
            const { user } = payload;
            state.user = user;
            addUserToLocalStorage(user);
            toast.success(`Welcome back ${user.name}`);
          })
          .addCase(loginUser.rejected, (state, { payload }) => {
            state.isLoading = false;
            toast.error(payload);
          })
          .addCase(updateUser.pending, (state) => {
            state.isLoading = true;
          })
          .addCase(updateUser.fulfilled, (state, { payload }) => {
            state.isLoading = false;
            const { user } = payload;
            state.user = user;
            addUserToLocalStorage(user);
            toast.success(`User updated`);
          })
          .addCase(updateUser.rejected, (state, { payload }) => {
            state.isLoading = false;
            toast.error(payload);
          })
          .addCase(clearStore.rejected, (state) => {
            toast.error('there was an error');
          });
    }
})
export const { toggleSidebar, logoutUser} = userSlice.actions;
export default userSlice.reducer;
