import { combineReducers } from "@reduxjs/toolkit";
import { alertReducer } from "./alert";
import { authReducer } from "./auth";

const reducers = {
  alertState: alertReducer,
  authState: authReducer,
};

const createRootReducer = () => {
  const rootReducer = combineReducers({
    ...reducers,
  });

  return rootReducer;
};

export { createRootReducer };
