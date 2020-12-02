import { createAction } from "@reduxjs/toolkit";
import {
  PROFILE_ERROR,
  PROFILE_REQUEST,
  PROFILE_SUCCESS,
  CLEAR_PROFILE,
} from "./actionTypes";

export const profileRequest = createAction(PROFILE_REQUEST);
export const profileSuccess = createAction(PROFILE_SUCCESS, (data: any) => {
  return {
    payload: data,
  };
});
export const profileError = createAction(PROFILE_ERROR, (data: any) => {
  return {
    payload: data,
  };
});
export const clearProfile = createAction(CLEAR_PROFILE);
