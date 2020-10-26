import { combineReducers } from "@reduxjs/toolkit";
import { alertReducer } from "../reducers/alert";

const reducers = {
  alertState: alertReducer,
};

const createRootReducer = () => {
  const rootReducer = combineReducers({
    ...reducers,
  });

  return rootReducer;
};

export { createRootReducer };
