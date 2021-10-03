import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

export interface ILoaderState {
  apiQueue: number;
  status: "idle" | "loading" | "failed";
}

const initialState: ILoaderState = {
  apiQueue: 0,
  status: "idle",
};

export const loaderSlice = createSlice({
  name: "loader",
  initialState,
  reducers: {
    apiCallStart: (state) => {
      state.apiQueue++;
      state.status = "loading";
    },
    apiCallEnd: (state) => {
      state.apiQueue--;
      if (state.apiQueue <= 0) {
        state.apiQueue = 0;
        state.status = "idle";
      }
    },
    apiCallFail: (state) => {
      state.apiQueue = 0;
      state.status = "failed";
    },
  },
});

export const { apiCallStart, apiCallEnd, apiCallFail } = loaderSlice.actions;
export const loaderSelector = (state: RootState) => state.loader;

export default loaderSlice.reducer;
