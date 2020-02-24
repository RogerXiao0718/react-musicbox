import { combineReducers } from "redux";
import playerReducer from "./playerReducer.js";

const mainReducer = combineReducers({
  player: playerReducer
});

export default mainReducer;
