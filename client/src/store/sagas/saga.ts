import { all, fork } from "redux-saga/effects";
import registerSaga from "./auth";

function* rootSaga() {
  yield all([fork(registerSaga)]);
}

export { rootSaga };
