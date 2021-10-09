/* eslint-disable @typescript-eslint/no-unused-vars */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { IUser } from "../../interfaces";
import userServices from "../../services/userServices";

export const fetchAllUsers = createAsyncThunk(
  "permission/fetchAllUsers",
  async (qs: string, thunkAPI) => {
    try {
      const response = await userServices.fetchAllUsers(qs);
      return response;
    } catch (error) {
      throw error;
    }
  }
);

interface IUserState {
  users: IUser[];
  status: "idle" | "loading" | "failed";
  total: number;
}

const initialState: IUserState = {
  users: [],
  status: "idle",
  total: 0,
};

export const userSlice = createSlice({
  name: "user",
  initialState,

  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(fetchAllUsers.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchAllUsers.fulfilled, (state, action) => {
        state.status = "idle";
        state.users = action.payload.results;
        state.total = action.payload.total;
      })
      .addCase(fetchAllUsers.rejected, (state) => {
        state.status = "failed";
        state.users = [];
      });
  },
});
// export const { setPermissionList } = userSlice.actions;
export const selectUser = (state: RootState) => state.users;

export default userSlice.reducer;
