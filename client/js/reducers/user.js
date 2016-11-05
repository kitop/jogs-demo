import { LOG_IN } from '../constants/action_types'

const user = (state = {}, action) => {
  switch(action.type) {
    case LOG_IN:
      return {
        ...state,
        id: action.id,
        role: action.role,
        token: action.token,
      };
    default:
      return state
  }
}

export default user;
