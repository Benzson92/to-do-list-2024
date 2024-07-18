import { combineReducers } from "@reduxjs/toolkit";

import todoReducer from "./todos.reducer";

export default combineReducers({
  todoReducer,
});
