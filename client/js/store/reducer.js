import { combineReducers } from 'redux'
import { routerReducer as routing } from 'react-router-redux';
import user from "./users/reducer";
import jogs from "./jogs/reducer";

export default combineReducers({
  user,
  jogs,
  routing
});
