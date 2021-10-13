/* eslint-disable @typescript-eslint/no-unused-vars */
import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState, AppThunk } from "../../app/store";
import {
  IPermission,
  IRole,
  ResponseError,
  Response,
  RolePayload,
} from "../../interfaces";
import permissionService from "../../services/permissionService";
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
export const listPermissions = createAsyncThunk<
  IPermission[],
  any,
  { rejectValue: ResponseError }
>("role/listPermissions", async (_, thunkAPI) => {
  try {
    const response = await permissionService.listPermission();
    return response;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});
export const createRole = createAsyncThunk<
  IRole,
  RolePayload,
  { rejectValue: ResponseError }
>("role/createRole", async (requestPayload, thunkAPI) => {
  try {
    const response = await roleService.createRole(requestPayload);
    return response;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});
export const updateRole = createAsyncThunk<
  IRole,
  RolePayload,
  { rejectValue: ResponseError }
>("role/updateRole", async (requestPayload, thunkAPI) => {
  try {
    const response = await roleService.updateRole(requestPayload);
    return response;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});
export const destroyRole = createAsyncThunk<
  number,
  number,
  { rejectValue: ResponseError }
>("role/destroyRole", async (id, thunkAPI) => {
  try {
    await roleService.destroyRole(id);
    return id;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

interface BasicState {
  status: "idle" | "loading" | "failed";
  error: ResponseError | undefined;
}
interface IRoleState {
  list: BasicState & {
    roles: IRole[];
    total: number;
  };
  permissionList: BasicState & {
    permissions: IPermission[] | undefined;
  };
  create: BasicState;
  update: BasicState;
  destroy: BasicState;
}

const initialState: IRoleState = {
  list: {
    roles: [],
    status: "idle",
    total: 0,
    error: undefined,
  },
  permissionList: {
    permissions: [],
    status: "idle",
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

export const roleSlice = createSlice({
  name: "role",
  initialState,

  reducers: {
    resetRoleStatus: (state) => {
      state.list.status = "idle";
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchAllRoles.pending, (state, action) => {
        state.list.status = "loading";
      })
      .addCase(fetchAllRoles.fulfilled, (state, action) => {
        state.list.status = "idle";
        if (action.payload) {
          state.list.roles = action.payload.results;
          state.list.total = action.payload.total;
        }
      })
      .addCase(fetchAllRoles.rejected, (state) => {
        state.list.status = "failed";
        state.list.roles = [];
      });
    builder
      .addCase(listPermissions.pending, (state, action) => {
        state.list.status = "loading";
      })
      .addCase(listPermissions.fulfilled, (state, action) => {
        state.permissionList.status = "idle";
        state.permissionList.permissions = action.payload;
      })
      .addCase(listPermissions.rejected, (state) => {
        state.list.status = "failed";
        state.permissionList.permissions = [];
      });
    builder
      .addCase(createRole.pending, (state, action) => {
        state.create.status = "loading";
      })
      .addCase(createRole.fulfilled, (state, action) => {
        state.create.status = "idle";
        if (action.payload) {
          state.list.roles.unshift(action.payload);
        }
      })
      .addCase(createRole.rejected, (state, action) => {
        state.create.status = "failed";
        state.create.error = action.payload;
      });
    builder
      .addCase(updateRole.pending, (state, action) => {
        state.update.status = "loading";
      })
      .addCase(updateRole.fulfilled, (state, action) => {
        state.update.status = "idle";

        const idx = state.list.roles.findIndex(
          (obj) => action.payload.id === obj.id
        );
        state.list.roles[idx] = action.payload;
      })
      .addCase(updateRole.rejected, (state, action) => {
        state.update.status = "failed";
        state.update.error = action.payload;
      });
    builder
      .addCase(destroyRole.pending, (state, action) => {
        state.update.status = "loading";
      })
      .addCase(destroyRole.fulfilled, (state, action) => {
        state.update.status = "idle";

        state.list.roles = state.list.roles.filter(
          (obj) => action.payload !== obj.id
        );
      })
      .addCase(destroyRole.rejected, (state, action) => {
        state.update.status = "failed";
        state.update.error = action.payload;
      });
  },
});
export const { resetRoleStatus } = roleSlice.actions;
export const selectRole = (state: RootState) => state.role;

export default roleSlice.reducer;
