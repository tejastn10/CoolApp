import { createAction } from "@reduxjs/toolkit";
import {
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
} from "./actionTypes";

export const registerRequest = createAction(REGISTER_REQUEST, (data: any) => {
  return { payload: data };
});
export const registerSuccess = createAction(REGISTER_SUCCESS, (data: any) => {
  return {
    payload: data,
  };
});
export const registerFail = createAction(REGISTER_FAIL);
