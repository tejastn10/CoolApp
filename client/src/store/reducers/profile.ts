import { createReducer } from "@reduxjs/toolkit";
import { ProfileState } from "../@types/types";
import {
  profileRequest,
  profileSuccess,
  profileError,
} from "../actions/actions";

const initialState: ProfileState = {
  profile: null,
  profiles: [],
  loading: false,
  error: {},
};

const reducer = createReducer(initialState, (builder) => {
  return builder
    .addCase(profileRequest, (state) => {
      state.loading = true;
    })
    .addCase(profileSuccess, (state, action) => {
      state.loading = false;
      console.log(action.payload);
      state.profile = action.payload;
    })
    .addCase(profileError, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
});

export { initialState as profileInitialState, reducer as profileReducer };
