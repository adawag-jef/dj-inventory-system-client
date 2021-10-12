/* eslint-disable @typescript-eslint/no-unused-vars */
import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState, AppThunk } from "../../app/store";
import {
  IPermission,
  PermissionPayload,
  ResponseError,
} from "../../interfaces";
import permissionService from "../../services/permissionService";
import { apiCallEnd, apiCallFail, apiCallStart } from "../loader/loaderSlice";

export const fetchAllPermissions = createAsyncThunk(
  "permission/fetchAllPermissions",
  async (qs: string, thunkAPI) => {
    try {
      const response = await permissionService.fetchAllPermissions(qs);
      return response;
    } catch (error) {
      throw error;
    }
  }
);

export const createPermission = createAsyncThunk<
  IPermission,
  PermissionPayload,
  { rejectValue: ResponseError }
>(
  "auth/createPermission",
  async (requestPayload: PermissionPayload, thunkAPI) => {
    try {
      const response = await permissionService.createPermission(requestPayload);
      return response;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const updatePermission = createAsyncThunk<
  IPermission,
  PermissionPayload,
  { rejectValue: ResponseError }
>(
  "auth/updatePermission",
  async (requestPayload: PermissionPayload, thunkAPI) => {
    const { id, ...payload } = requestPayload;
    debugger;
    if (!id)
      return thunkAPI.rejectWithValue({ error: "Something went wrong." });
    try {
      const response = await permissionService.updatePermission(payload, id);
      return response;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
export const deletePermission = createAsyncThunk<
  number,
  number,
  { rejectValue: ResponseError }
>("auth/deletePermission", async (id: number, thunkAPI) => {
  try {
    await permissionService.deletePermission(id);
    return id;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

interface IPermissionState {
  permissions: IPermission[];
  status: "idle" | "loading" | "failed";
  total: number;
  error: ResponseError | undefined;
}

const initialState: IPermissionState = {
  permissions: [],
  status: "idle",
  total: 0,
  error: undefined,
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
        state.permissions = [];
      });
    builder
      .addCase(createPermission.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(createPermission.fulfilled, (state, action) => {
        state.status = "idle";
        state.permissions.unshift(action.payload);
        state.total++;
      })
      .addCase(createPermission.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
    builder
      .addCase(updatePermission.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(updatePermission.fulfilled, (state, action) => {
        state.status = "idle";
        state.permissions = state.permissions.map((item) => {
          if (item.id === action.payload.id) {
            return action.payload;
          }
          return item;
        });
      })
      .addCase(updatePermission.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
    builder
      .addCase(deletePermission.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deletePermission.fulfilled, (state, action) => {
        state.status = "idle";
        state.permissions = state.permissions.filter(
          (item) => item.id !== action.payload
        );
      })
      .addCase(deletePermission.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});
export const { setPermissionList } = permissionSlice.actions;
export const selectPermission = (state: RootState) => state.permission;

export default permissionSlice.reducer;
