import * as actions from '../constants/action_types'
import { getUser } from "../utils/user";

let currentUser = getUser() || {};

const user = (state = currentUser, action) => {
  switch(action.type) {
    case actions.LOG_IN:
      return {
        id: action.id,
        role: action.role,
        email: action.email,
        token: action.token,
      };
    case actions.FAILED_LOG_IN:
      return {
        logInError: action.errors
      };
    case actions.LOG_OUT:
      return {};
    default:
      return state;
  }
}

export default user;
