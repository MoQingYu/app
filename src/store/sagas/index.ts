import { all, fork } from "redux-saga/effects";
import { watchUserFetch } from "./user";


export default function* rootSaga() {
  yield all([
    fork(watchUserFetch)
  ])
}