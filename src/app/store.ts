import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";

import authSlice from "../features/auth/authSlice";
import loaderSlice from "../features/loader/loaderSlice";
import permissionSlice from "../features/permission/permissionSlice";

const reducers = combineReducers({
  auth: authSlice,
  loader: loaderSlice,
  permission: permissionSlice,
});

const persistConfig = {
  key: "root",
  storage,
};

// const persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
  reducer: reducers,
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
