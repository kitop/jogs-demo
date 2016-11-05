import * as actions from '../constants/action_types'

const user = (state = {}, action) => {
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
      }
    default:
      return state
  }
}

export default user;
