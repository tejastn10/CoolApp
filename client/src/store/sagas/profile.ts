import { Action, nanoid } from "@reduxjs/toolkit";
import { all, call, delay, fork, put, takeLatest } from "redux-saga/effects";
import { getCurrentProfile } from "../../services/API";
import {
  profileError,
  profileRequest,
  profileSuccess,
} from "../actions/profile";
import { removeAlert, setAlert } from "../actions/alert";

function* profile(action: Action) {
  try {
    if (profileRequest.match(action)) {
      console.log("weehee");
      const res = yield call(getCurrentProfile);
      const data = res.data;
      console.log(data);
      const id = nanoid();
      if (res.status !== 200) {
        yield put(profileError(res.statustext));
        yield put(setAlert(id, "Server Error", "error"));
        yield delay(5000);
        yield put(removeAlert(id));
      } else {
        yield put(profileSuccess(data));
      }
    }
  } catch (err) {
    const id = nanoid();
    yield put(profileError(err.response.statustext));
    yield put(setAlert(id, err.response.statusText, "error"));
    yield delay(5000);
    yield put(removeAlert(id));
  }
}

function* watchProfileRequest() {
  yield takeLatest(profileRequest.type, profile);
}

export default function* profileSaga() {
  yield all([fork(watchProfileRequest)]);
}
