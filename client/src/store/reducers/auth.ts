import { createReducer } from "@reduxjs/toolkit";
import { AuthState } from "../@types/types";
import {
  registerRequest,
  registerSuccess,
  registerFail,
  loginRequest,
  loginSuccess,
  loginFail,
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
    .addCase(authError, (state) => {
      state.token = null;
      state.isAuthenticated = false;
      state.loading = false;
    })
    .addCase(registerRequest, (state) => {
      state.loading = true;
    })
    .addCase(registerSuccess, (state, action) => {
      localStorage.setItem("token", action.payload.token);
      state.token = action.payload.token;
      state.loading = false;
      state.isAuthenticated = true;
      state.user = null;
    })
    .addCase(registerFail, (state) => {
      state.token = null;
      state.isAuthenticated = false;
      state.loading = false;
    })
    .addCase(loginRequest, (state) => {
      state.loading = true;
    })
    .addCase(loginSuccess, (state, action) => {
      localStorage.setItem("token", action.payload.token);
      state.token = action.payload.token;
      state.loading = false;
      state.isAuthenticated = true;
      state.user = null;
    })
    .addCase(loginFail, (state) => {
      state.token = null;
      state.isAuthenticated = false;
      state.loading = false;
    });
});

export { initialState as authInitialState, reducer as authReducer };
