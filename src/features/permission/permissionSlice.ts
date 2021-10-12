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

interface BasicState {
  status: "idle" | "loading" | "failed";
  error: ResponseError | undefined;
}
interface IPermissionState {
  list: BasicState & {
    permissions: IPermission[];
    total: number;
  };
  create: BasicState;
  update: BasicState;
  destroy: BasicState;
}

const initialState: IPermissionState = {
  list: {
    permissions: [],
    status: "idle",
    total: 0,
    error: undefined,
  },
  create: {
    status: "idle",
    error: undefined,
  },
  update: {
    status: "idle",
    error: undefined,
  },
  destroy: {
    status: "idle",
    error: undefined,
  },
};

export const permissionSlice = createSlice({
  name: "permission",
  initialState,

  reducers: {
    setPermissionList: (state, action: PayloadAction<IPermission[]>) => {
      state.list.permissions = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchAllPermissions.pending, (state, action) => {
        state.list.status = "loading";
      })
      .addCase(fetchAllPermissions.fulfilled, (state, action) => {
        state.list.status = "idle";
        state.list.permissions = action.payload.results;
        state.list.total = action.payload.total;
      })
      .addCase(fetchAllPermissions.rejected, (state) => {
        state.list.status = "failed";
        state.list.permissions = [];
      });
    builder
      .addCase(createPermission.pending, (state, action) => {
        state.create.status = "loading";
      })
      .addCase(createPermission.fulfilled, (state, action) => {
        state.create.status = "idle";
        state.list.permissions.unshift(action.payload);
        state.list.total++;
        state.create.error = undefined;
        state.update.error = undefined;
        state.destroy.error = undefined;
      })
      .addCase(createPermission.rejected, (state, action) => {
        state.create.status = "failed";
        state.create.error = action.payload;
      });
    builder
      .addCase(updatePermission.pending, (state, action) => {
        state.update.status = "loading";
        state.create.error = undefined;
        state.update.error = undefined;
        state.destroy.error = undefined;
      })
      .addCase(updatePermission.fulfilled, (state, action) => {
        state.update.status = "idle";
        state.list.permissions = state.list.permissions.map((item) => {
          if (item.id === action.payload.id) {
            return action.payload;
          }
          return item;
        });
        state.create.error = undefined;
        state.update.error = undefined;
        state.destroy.error = undefined;
      })
      .addCase(updatePermission.rejected, (state, action) => {
        state.update.status = "failed";
        state.update.error = action.payload;
      });
    builder
      .addCase(deletePermission.pending, (state) => {
        state.destroy.status = "loading";
      })
      .addCase(deletePermission.fulfilled, (state, action) => {
        state.destroy.status = "idle";
        state.list.permissions = state.list.permissions.filter(
          (item) => item.id !== action.payload
        );
        state.create.error = undefined;
        state.update.error = undefined;
        state.destroy.error = undefined;
      })
      .addCase(deletePermission.rejected, (state, action) => {
        state.destroy.status = "failed";
        state.destroy.error = action.payload;
      });
  },
});
export const { setPermissionList } = permissionSlice.actions;
export const selectPermission = (state: RootState) => state.permission;

export default permissionSlice.reducer;
