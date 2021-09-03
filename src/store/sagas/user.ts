import { call, put, take } from "redux-saga/effects";
import { 
  FETCH_USER_INFO,
  saveFetchResult 
} from "../actions/user";
import { getSysUser } from "@api/user";

export function* watchUserFetch () {
  try {
    yield take(FETCH_USER_INFO);
    const res = yield call(getSysUser);
    let payload = {info: res.data, success: true};
    if(res.status == 200) {
      payload = {info: {}, success: false};
    }
    yield put(saveFetchResult(payload));
  } catch (error) {
    console.log(error)
  }
}