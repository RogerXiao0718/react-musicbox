import { combineReducers } from "redux";
import playerReducer from "./playerReducer.js";
import socketReducer from "./socketReducer.js";

const mainReducer = combineReducers({
  player: playerReducer,
  socket: socketReducer
});

export default mainReducer;
