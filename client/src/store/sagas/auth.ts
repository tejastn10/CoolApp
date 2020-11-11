import { Action, nanoid } from "@reduxjs/toolkit";
import { all, call, delay, fork, put, takeLatest } from "redux-saga/effects";
import { registerUser, userAuth } from "../../services/API";
import { removeAlert, setAlert } from "../actions/alert";
import {
  registerRequest,
  registerSuccess,
  registerFail,
  authRequest,
  authError,
  authSuccess,
} from "../actions/auth";

function* auth(action: Action) {
  try {
    if (authRequest.match(action)) {
      const res = yield call(userAuth, action.payload);
      const data = res.data;
      const id = nanoid();
      if (res.status !== 200) {
        localStorage.removeItem("token");
        yield put(authError());
        yield put(setAlert(id, "Authentication Failed! Server Error", "error"));
        yield delay(5000);
        yield put(removeAlert(id));
      } else {
        yield put(authSuccess(data));
      }
    }
  } catch (err) {
    const id = nanoid();
    localStorage.removeItem("token");
    yield put(authError());
    yield put(setAlert(id, "Authorization Failed!!!", "error"));
    yield delay(5000);
    yield put(removeAlert(id));
  }
}

function* register(action: Action) {
  try {
    if (registerRequest.match(action)) {
      const res = yield call(registerUser, action.payload);
      const data = res.data;
      const id = nanoid();
      if (res.status !== 200) {
        localStorage.removeItem("token");
        yield put(registerFail());
        yield put(setAlert(id, "Registration Failed! Server Error", "error"));
        yield delay(5000);
        yield put(removeAlert(id));
      } else {
        yield put(registerSuccess(data));
        yield put(setAlert(id, "User Registered", "success"));
        yield delay(5000);
        yield put(removeAlert(id));
      }
    }
  } catch (err) {
    const id = nanoid();
    localStorage.removeItem("token");
    yield put(registerFail());
    yield put(
      setAlert(
        id,
        "Registration Failed! Please check your credentials...",
        "error"
      )
    );
    yield delay(5000);
    yield put(removeAlert(id));
  }
}

function* watchRegisterRequest() {
  yield takeLatest(registerRequest.type, register);
}

function* watchAuthRequest() {
  yield takeLatest(authRequest.type, auth);
}

export default function* registerSaga() {
  yield all([fork(watchRegisterRequest), fork(watchAuthRequest)]);
}
