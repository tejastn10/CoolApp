import { createAction } from "@reduxjs/toolkit";
import {
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  AUTH_REQUEST,
  AUTH_SUCCESS,
  AUTH_ERROR,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
} from "./actionTypes";

export const authRequest = createAction(AUTH_REQUEST);
export const authSuccess = createAction(AUTH_SUCCESS, (data: any) => {
  return {
    payload: data,
  };
});
export const authError = createAction(AUTH_ERROR);

export const registerRequest = createAction(REGISTER_REQUEST, (data: any) => {
  return { payload: data };
});
export const registerSuccess = createAction(REGISTER_SUCCESS, (data: any) => {
  return {
    payload: data,
  };
});
export const registerFail = createAction(REGISTER_FAIL);

export const loginRequest = createAction(LOGIN_REQUEST, (data: any) => {
  return { payload: data };
});
export const loginSuccess = createAction(LOGIN_SUCCESS, (data: any) => {
  return {
    payload: data,
  };
});
export const loginFail = createAction(LOGIN_FAIL);

export const logout = createAction(LOGOUT);
