import * as actions from "./action_types";

const admin = (state = {}, action) => {
  switch(action.type) {
    case actions.USERS_FETCHED:
      return {
        users: action.users
      }
    case actions.USER_REMOVED:
      return {
        users: state.users.filter(u => u.id != action.id)
      }
    default:
      return state;
  }
}

export default admin;
