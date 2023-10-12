import customFetch, { checkUnauthorizedResponse } from "../../utils/axios";


export const getAllJobsThunk = async (_, thunkAPI) => {
  const { search, searchStatus, searchType, sort, page } =
    thunkAPI.getState().allJobsState;
  let url = `/jobs?status=${searchStatus}&sort=${sort}&jobType=${searchType}&page=${page}`;
  if (search) {
    url = url + `&search=${search}`;
  }
  try {
    const response = await customFetch.get(url, {
      headers: {
        authorization: `Bearer ${thunkAPI.getState().userState.user.token}`,
      },
    });
    return response.data;
  } catch (error) {
          return checkUnauthorizedResponse(error, thunkAPI);

  }
};

export const showStatsThunk = async (_, thunkAPI) => {
  try {
    const response = await customFetch.get("/jobs/stats", {
      headers: {
        authorization: `Bearer ${thunkAPI.getState().userState.user.token}`,
      },
    });
    return response.data;
  } catch (error) {
          return checkUnauthorizedResponse(error, thunkAPI);

  }
};