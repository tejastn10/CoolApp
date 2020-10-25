import { createReducer } from "@reduxjs/toolkit";
import { AlertState } from "../@types/types";
import { setAlert, removeAlert } from "../actions/actions";

const initalState: AlertState = {
  alerts: null,
};

const reducer = createReducer(initalState, (builder) => {
  return builder
    .addCase(setAlert, (state, action) => {
      if (!state.alerts) {
        state.alerts = [action.payload];
      } else {
        state.alerts = [...state.alerts, action.payload];
      }
    })
    .addCase(removeAlert, (state, action) => {
      state.alerts = state.alerts!.filter(
        (alert) => alert.id !== action.payload
      );
    });
});

export { initalState as alertInitialState, reducer as alertReducer };
