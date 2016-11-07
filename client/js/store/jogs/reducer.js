import * as actions from './action_types'

const jogs = (state = {}, action) => {
  switch(action.type) {
    case actions.JOGS_FETCHED:
      return {
        ...state,
        list: action.list
      }
    default:
      return state;
  }
}

export default jogs;
