import * as actions from "./action_types";

const user = (params) => ({
  id: params.id,
  email: params.email,
  role: params.role,
})

const admin = (state = {}, action) => {
  switch(action.type) {
    case actions.USERS_FETCHED:
      return {
        users: action.users
      }
    case actions.USER_ADDED:
      return {
        users: [
          ...state.users,
          user(action)
        ]
      }
    case actions.USER_REMOVED:
      return {
        users: state.users.filter(u => u.id != action.id)
      }
    case actions.USER_FORM_ERROR:
      return {
        ...state,
        userError: action.error
      }
    case actions.CLEAR_USER_FORM_ERROR:
      return {
        ...state,
        userError: undefined
      }
    default:
      return state;
  }
}

export default admin;
