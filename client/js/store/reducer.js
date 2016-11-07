import { combineReducers } from 'redux'
import { routerReducer as routing } from 'react-router-redux';
import user from "./users/reducer";

export default combineReducers({
  user,
  routing
});
