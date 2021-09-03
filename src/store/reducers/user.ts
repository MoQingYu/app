import { FETCH_USER_INFO } from "../actions/user";

const initUser = {}

export default function (state = initUser, action) {
  switch(action.type) {
    case FETCH_USER_INFO: 
      return {...state, action}
    default:
      return state;
  }
}