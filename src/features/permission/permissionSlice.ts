import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState, AppThunk } from "../../app/store";
import { IPermission } from "../../interfaces";
import permissionService from "../../services/permissionService";
import { apiCallEnd, apiCallFail, apiCallStart } from "../loader/loaderSlice";

export const fetchAllPermissions = createAsyncThunk(
  "permission/fetchAllPermissions",
  async (qs: string, thunkAPI) => {
    const response = await permissionService.fetchAllPermissions(qs);
    return response;
  }
);

interface IPermissionState {
  permissions: IPermission[];
  status: "idle" | "loading" | "failed";
  total: number;
}

const initialState: IPermissionState = {
  permissions: [],
  status: "idle",
  total: 0,
};

export const permissionSlice = createSlice({
  name: "permission",
  initialState,

  reducers: {
    setPermissionList: (state, action: PayloadAction<IPermission[]>) => {
      state.permissions = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchAllPermissions.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchAllPermissions.fulfilled, (state, action) => {
        state.status = "idle";
        state.permissions = action.payload.results;
        state.total = action.payload.total;
      })
      .addCase(fetchAllPermissions.rejected, (state) => {
        state.status = "failed";
      });
  },
});
export const { setPermissionList } = permissionSlice.actions;
export const selectPermission = (state: RootState) => state.permission;

export default permissionSlice.reducer;
