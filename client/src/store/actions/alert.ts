import { createAction, nanoid } from "@reduxjs/toolkit";
import { SET_AlERT, REMOVE_AlERT } from "./actionTypes";
import { Alert } from "../@types/types";

export const setAlert = createAction(
  SET_AlERT,
  (msg: string, alertType: string) => {
    const id = nanoid();
    return {
      type: SET_AlERT,
      payload: { id, msg, alertType },
    };
  }
);

export const removeAlert = createAction(
  REMOVE_AlERT,
  ({ id, msg, alertType }: Alert) => {
    return {
      type: REMOVE_AlERT,
      payload: { id },
    };
  }
);
