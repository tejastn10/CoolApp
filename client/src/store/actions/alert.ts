import { createAction } from "@reduxjs/toolkit";
import { SET_AlERT, REMOVE_AlERT } from "./actionTypes";

export const setAlert = createAction(
  SET_AlERT,
  (id: string, msg: string, alertType: string) => {
    return {
      payload: { id, msg, alertType },
    };
  }
);

export const removeAlert = createAction(REMOVE_AlERT, (id: string) => {
  return {
    payload: { id },
  };
});
