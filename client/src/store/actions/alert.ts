import { createAction } from "@reduxjs/toolkit";
import { SET_AlERT, REMOVE_AlERT } from "./actionTypes";
import { Alert } from "../@types/types";

export const setAlert = createAction(
  SET_AlERT,
  (id: string, msg: string, alertType: string) => {
    return {
      type: SET_AlERT,
      payload: { id, msg, alertType },
    };
  }
);

export const removeAlert = createAction(REMOVE_AlERT, (id: string) => {
  return {
    type: REMOVE_AlERT,
    payload: { id },
  };
});
