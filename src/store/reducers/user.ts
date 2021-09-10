import { 
  SAVE_FETCH_USER,
  SAVE_FETCH_ROUTES  
} from "../actions/user";
import {
  UserReduxModel,
  ActionModel
} from "@models/user";

const initUser: UserReduxModel = {}

export default function (state = initUser, action: ActionModel) {
  const { type, ...rest } = action;
  switch(type) {
    case SAVE_FETCH_USER: 
      return {...state, ...rest};
    case SAVE_FETCH_ROUTES: 
      return {...state, ...rest};
    default:
      return state;
  }
}