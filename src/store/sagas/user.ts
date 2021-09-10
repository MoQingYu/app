import { call, fork, put, take } from "redux-saga/effects";
import { 
  FETCH_USER_INFO,
  saveFetchUser, 
  saveFetchRoutes 
} from "../actions/user";
import { 
  getSysUser,
  getMenuData 
} from "@api/user";
import {
  ResponseModel
} from "@models/fetch";
import {
  UserReduxModel,
  UserModel
} from "@models/user";

export function* watchUserFetch () {
  try {
    yield take(FETCH_USER_INFO);
    const res: ResponseModel = yield call(getSysUser);
    let payload: UserReduxModel = {info: res.data};
    if(res.status !== 200) {
      payload = {info: null};
    }
    yield put(saveFetchUser(payload));
    if(res.data.id) {
      yield fork(watchMenuFetch, res.data)
    }
  } catch (error) {
    console.log(error)
  }
}

function* watchMenuFetch(data: UserModel) {
  let formData = new FormData()
  formData.append("username", data.username)
  formData.append("sysId", "17")
  formData.append("mobile", data.mobile)
  const res: ResponseModel = yield call(getMenuData, formData);
  let payload: UserReduxModel = {routes: res.menu};
  if(res.status !== "ok") {
    payload = {routes: []};
  }
  yield put(saveFetchRoutes(payload)) 
}