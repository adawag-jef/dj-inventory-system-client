/* eslint-disable @typescript-eslint/no-unused-vars */
import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState, AppThunk } from "../../app/store";
import { IPermission, IRole, ResponseError, Response } from "../../interfaces";
import roleService from "../../services/roleService";

export const fetchAllRoles = createAsyncThunk<
  Response<IRole> | undefined,
  string,
  { rejectValue: ResponseError }
>("role/fetchAllRoles", async (qs: string, thunkAPI) => {
  try {
    const response = await roleService.fetchAllRoles(qs);
    return response;
  } catch (error: any) {
    thunkAPI.rejectWithValue(error.response.data);
  }
});

interface IRoleState {
  roles: IRole[];
  status: "idle" | "loading" | "failed";
  total: number;
}

const initialState: IRoleState = {
  roles: [],
  status: "idle",
  total: 0,
};

export const roleSlice = createSlice({
  name: "role",
  initialState,

  reducers: {
    resetRoleStatus: (state) => {
      state.status = "idle";
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchAllRoles.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchAllRoles.fulfilled, (state, action) => {
        state.status = "idle";
        if (action.payload) {
          state.roles = action.payload.results;
          state.total = action.payload.total;
        }
      })
      .addCase(fetchAllRoles.rejected, (state) => {
        state.status = "failed";
        state.roles = [];
      });
  },
});
export const { resetRoleStatus } = roleSlice.actions;
export const selectRole = (state: RootState) => state.role;

export default roleSlice.reducer;
