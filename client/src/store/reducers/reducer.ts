import { combineReducers } from "@reduxjs/toolkit";

const reducers = {};

const createRootReducer = () => {
  const rootReducer = combineReducers({
    ...reducers,
  });

  return rootReducer;
};

export { createRootReducer };
