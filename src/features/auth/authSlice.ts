import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import {
  IRequestResetPasswordPayload,
  LoginPayload,
  RegisterPayload,
  SetNewPasswordPayload,
} from "../../interfaces";
import Client from "../../services/Client";

const client = Client.getInstance();

export interface ITokens {
  access?: string;
  refresh?: string;
}

interface ResponseError {
  [key: string]: any;
}

export interface IUser {
  id: number;
  email: string;
  username: string;
  tokens?: ITokens;
}

export interface IAuthState {
  user: IUser | undefined;
  isAuthenticated: boolean;
  status: "idle" | "loading" | "failed" | "success";
  error: ResponseError | undefined;
}

const initialState: IAuthState = {
  user: {
    id: 0,
    email: "",
    username: "",
    tokens: {
      access: "",
      refresh: "",
    },
  },
  isAuthenticated: false,
  status: "idle",
  error: undefined,
};

export const requestResetPassword = createAsyncThunk<
  any,
  IRequestResetPasswordPayload,
  { rejectValue: ResponseError }
>(
  "auth/requestResetPassword",
  async (requestPayload: IRequestResetPasswordPayload, thunkAPI) => {
    try {
      const response = await client.requestResetPassword(requestPayload);
      return response;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
export const setNewPassword = createAsyncThunk<
  any,
  SetNewPasswordPayload,
  { rejectValue: ResponseError }
>(
  "auth/setNewPassword",
  async (requestPayload: SetNewPasswordPayload, thunkAPI) => {
    try {
      const response = await client.setNewPassword(requestPayload);
      return response;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
export const loginUser = createAsyncThunk<
  IUser,
  LoginPayload,
  { rejectValue: ResponseError }
>("auth/loginUser", async (requestPayload: LoginPayload, thunkAPI) => {
  try {
    const response = await client.loginUser(requestPayload);
    return response;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

export const registerUser = createAsyncThunk<
  IUser,
  RegisterPayload,
  { rejectValue: ResponseError }
>("auth/registerUser", async (requestPayload: RegisterPayload, thunkAPI) => {
  try {
    const response = await client.registerUser(requestPayload);
    return response;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

export const authSlice = createSlice({
  name: "auth",
  initialState,

  reducers: {
    setUser: (state, action: PayloadAction<IUser>) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      localStorage.setItem(
        "access_token",
        String(action.payload.tokens?.access)
      );
      localStorage.setItem(
        "refresh_token",
        String(action.payload.tokens?.refresh)
      );
    },

    resetStatus: (state) => {
      state.status = "idle";
    },
    setError: (state, action) => {
      state.status = "failed";
      state.status = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuthenticated = true;
        localStorage.setItem(
          "access_token",
          String(action.payload!.tokens?.access)
        );
        localStorage.setItem(
          "refresh_token",
          String(action.payload!.tokens?.refresh)
        );
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
    builder
      .addCase(requestResetPassword.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(requestResetPassword.fulfilled, (state, action) => {
        state.status = "success";
      })
      .addCase(requestResetPassword.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
    builder
      .addCase(setNewPassword.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(setNewPassword.fulfilled, (state, action) => {
        state.status = "success";
      })
      .addCase(setNewPassword.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
    builder
      .addCase(registerUser.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.status = "success";
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});
export const { setUser, resetStatus, setError } = authSlice.actions;
export const selectAuth = (state: RootState) => state.auth;

// export const loginUser =
//   (user: LoginPayload): AppThunk =>
//   async (dispatch, getState) => {
//     try {
//       dispatch(apiCallStart());

//       const res = await client.loginUser(user);
//       dispatch(setUser(res));
//       dispatch(apiCallEnd());
//     } catch (error) {
//       dispatch(apiCallFail());
//       dispatch(setError(error));
//     }
//   };

export default authSlice.reducer;
