import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState, AppThunk } from "../../app/store";
import { LoginPayload } from "../../interfaces";
import Client from "../../services/Client";
import { apiCallEnd, apiCallFail, apiCallStart } from "../loader/loaderSlice";

const client = Client.getInstance();

export interface ITokens {
  access?: string;
  refresh?: string;
}

export interface IUser {
  id: number;
  email: string;
  username: string;
  tokens?: ITokens;
}

export interface IAuthState {
  user: IUser;
  isAuthenticated: boolean;
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
};

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
  },

  //   extraReducers: (builder) => {
  //     builder
  //       .addCase(fetchTodos.pending, (state, action) => {
  //         state.status = "loading";
  //       })
  //       .addCase(fetchTodos.fulfilled, (state, action) => {
  //         state.status = "idle";
  //         state.todo = action.payload;
  //       })
  //       .addCase(fetchTodos.rejected, (state) => {
  //         state.status = "failed";
  //       });
  //   },
});
export const { setUser } = authSlice.actions;
export const selectAuth = (state: RootState) => state.auth;

export const loginUser =
  (user: LoginPayload): AppThunk =>
  async (dispatch, getState) => {
    try {
      dispatch(apiCallStart());

      const res = await client.loginUser(user);
      dispatch(setUser(res));
      dispatch(apiCallEnd());
    } catch (error) {
      dispatch(apiCallFail());
    }
  };

export default authSlice.reducer;
