import { all, fork } from "redux-saga/effects";
import registerSaga from "./auth";
import profileSaga from "./profile";

function* rootSaga() {
  yield all([fork(registerSaga), fork(profileSaga)]);
}

export { rootSaga };
