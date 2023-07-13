import { combineReducers } from "redux";
import countReducer from "./countReducer";
import valueReducer from "./valueReducer";

const rootReducer = combineReducers({
  count: countReducer,
  value: valueReducer,
});

export default rootReducer;
