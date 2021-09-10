import { createAction } from "./index";

export const FETCH_USER_INFO = Symbol();
export const SAVE_FETCH_USER = Symbol();
export const SAVE_FETCH_ROUTES = Symbol();

export const fetchUser = createAction(FETCH_USER_INFO)
export const saveFetchUser = createAction(SAVE_FETCH_USER)
export const saveFetchRoutes = createAction(SAVE_FETCH_ROUTES)
