import { Action, nanoid } from "@reduxjs/toolkit";
import { all, call, delay, fork, put, takeLatest } from "redux-saga/effects";
import { getCurrentProfile, userProfile } from "../../services/API";
import {
  profileError,
  profileRequest,
  profileSuccess,
  profile,
} from "../actions/profile";
import { removeAlert, setAlert } from "../actions/alert";

function* getProfile(action: Action) {
  try {
    if (profileRequest.match(action)) {
      const res = yield call(getCurrentProfile);
      const data = res.data;
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

function* setProfile(action: Action) {
  try {
    if (profile.match(action)) {
      const res = yield call(userProfile, action.payload);
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
        yield put(setAlert(id, "Profile Updated", "success"));
        yield delay(5000);
        yield put(removeAlert(id));
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

function* watchgetProfileRequest() {
  yield takeLatest(profileRequest.type, getProfile);
}

function* watchsetProfileRequest() {
  yield takeLatest(profile.type, setProfile);
}

export default function* profileSaga() {
  yield all([fork(watchgetProfileRequest), fork(watchsetProfileRequest)]);
}
