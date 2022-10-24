import { call, fork, put, take } from "redux-saga/effects";
import { 
  FETCH_USER_INFO,
  saveFetchUser, 
  saveFetchRoutes 
} from "../actions/user";
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
  } catch (error) {
    console.log(error)
  }
}