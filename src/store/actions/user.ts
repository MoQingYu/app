import { createAction } from "./index";

export const FETCH_USER_INFO = Symbol();
export const SAVE_FETCH_RESULT = Symbol();

export const fetchUser = createAction(FETCH_USER_INFO)
export const saveFetchResult = createAction(SAVE_FETCH_RESULT)
