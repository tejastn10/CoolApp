import { createReducer } from "@reduxjs/toolkit";
import { AuthState } from "../@types/types";
import {
  registerRequest,
  registerSuccess,
  registerFail,
} from "../actions/actions";

const initialState: AuthState = {
  token: localStorage.getItem("token"),
  isAuthenticated: null,
  loading: true,
  user: null,
};

const reducer = createReducer(initialState, (builder) => {
  return builder
    .addCase(registerRequest, (state) => {
      state = { ...state };
    })
    .addCase(registerSuccess, (state, action) => {
      localStorage.setItem("token", action.payload.token);
      state = {
        ...state,
        ...action.payload,
        isAuthenticated: true,
        loading: false,
      };
    })
    .addCase(registerFail, (state) => {
      state = {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
      };
    });
});

export { initialState as authInitialState, reducer as authReducer };
