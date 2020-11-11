import { createReducer } from "@reduxjs/toolkit";
import { AuthState } from "../@types/types";
import {
  registerRequest,
  registerSuccess,
  registerFail,
  authRequest,
  authSuccess,
  authError,
} from "../actions/actions";

const initialState: AuthState = {
  token: localStorage.getItem("token"),
  isAuthenticated: null,
  loading: true,
  user: null,
};

const reducer = createReducer(initialState, (builder) => {
  return builder
    .addCase(authRequest, (state) => {
      state.loading = true;
    })
    .addCase(authSuccess, (state, action) => {
      state.isAuthenticated = true;
      state.loading = false;
      state.user = action.payload;
    })
    .addCase(registerRequest, (state) => {
      state = state;
    })
    .addCase(registerSuccess, (state, action) => {
      localStorage.setItem("token", action.payload.token);
      state.loading = false;
      state.isAuthenticated = true;
      state.user = null;
    })
    .addCase(registerFail || authError, (state) => {
      state.token = null;
      state.isAuthenticated = false;
      state.loading = false;
    });
});

export { initialState as authInitialState, reducer as authReducer };
