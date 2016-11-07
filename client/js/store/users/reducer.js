import * as actions from './action_types'
import * as localStorage from "../../utils/user";

let currentUser = localStorage.getUser() || {};

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
    case actions.FAILED_SIGN_UP:
      return {
        errors: action.errors
      };
    case actions.LOG_OUT:
      return {};
    default:
      return state;
  }
}

export default user;
