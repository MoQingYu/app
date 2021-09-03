import { combineReducers } from "redux";
import userReduce from "./user";

export default combineReducers({
  user: userReduce
})