import * as actions from "./action_types";

const admin = (state = {}, action) => {
  switch(action.type) {
    case actions.USERS_FETCHED:
      return {
        users: action.users
      }
    default:
      return state;
  }
}

export default admin;
