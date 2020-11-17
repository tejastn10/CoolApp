import { combineReducers } from "@reduxjs/toolkit";
import { alertReducer } from "./alert";
import { authReducer } from "./auth";
import { profileReducer } from "./profile";

const reducers = {
  alertState: alertReducer,
  authState: authReducer,
  profileState: profileReducer,
};

const createRootReducer = () => {
  const rootReducer = combineReducers({
    ...reducers,
  });

  return rootReducer;
};

export { createRootReducer };
