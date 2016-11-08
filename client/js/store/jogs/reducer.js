import * as actions from './action_types'

const jog = (params) => ({
  id: params.id,
  date: params.date,
  duration: params.duration,
  distance: params.distance,
  average_speed: params.average_speed,
})

const jogs = (state = {}, action) => {
  switch(action.type) {
    case actions.JOGS_FETCHED:
      return {
        ...state,
        list: action.list
      }
    case actions.ADD_JOG:
      return {
        list: [
          ...state.list,
          jog(action)
        ]
      }
    case actions.EDIT_JOG:
      return {
        list: state.list.map(j => j.id == action.id ? jog(action) : j)
      }
    case actions.DELETE_JOG:
      return {
        list: state.list.filter(jog => jog.id !== action.id)
      }
    default:
      return state;
  }
}

export default jogs;
