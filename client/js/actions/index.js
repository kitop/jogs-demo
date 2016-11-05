import { push } from "react-router-redux";
import * as actions from "../constants/action_types";
import { setUser } from "../utils/user";
import ApiClient from "../utils/api_client";

const logIn = (response) => ({
  type: actions.LOG_IN,
  id: response.id,
  role: response.role,
  token: response.token,
  email: response.email,
})

const failedLogIn = (errors) => ({
  type: actions.FAILED_LOG_IN,
  errors
})


// THUNKS

export const onSubmitLogIn = (email, password) => (dispatch, getState) => {
  let routing = getState().routing.locationBeforeTransition

  ApiClient.logIn(email, password)
    .then(
      response => {
        dispatch(logIn(response.data));
        setUser(response.data);
        if(routing && routing.state && routing.state.nextPathname) {
          dispatch(push(routing.nextPathname))
        } else {
          dispatch(push("/"))
        }
      },
      error => {
        dispatch(failedLogIn(error.response.data.errors))
    })
}
