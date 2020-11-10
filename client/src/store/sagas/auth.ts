import { Action, nanoid } from "@reduxjs/toolkit";
import { all, call, delay, fork, put, takeLatest } from "redux-saga/effects";
import { api } from "../../services/API";
import { removeAlert, setAlert } from "../actions/alert";
import {
  registerRequest,
  registerSuccess,
  registerFail,
} from "../actions/auth";

function* register(action: Action) {
  try {
    if (registerRequest.match(action)) {
      const res = yield call(api, action.payload);
      const data = res.data;
      console.log(data);
      const id = nanoid();
      if (res.status !== 200) {
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

export default function* registerSaga() {
  yield all([fork(watchRegisterRequest)]);
}
