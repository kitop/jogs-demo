import { push } from "react-router-redux";
import * as actions from "../constants/action_types";
import { setUser, clearUser } from "../utils/user";
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

const logOut = () => ({
  type: actions.LOG_OUT
})

const failedSignUp = (errors) => ({
  type: actions.FAILED_SIGN_UP,
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

export const onLogOut = () => (dispatch, getState) => {
  dispatch(logOut())
  // TODO clear jogs?
  clearUser();
  dispatch(push("/sign_in"))
}

export const onSubmitSignUp = (params) => (dispatch, getState) => {
  ApiClient.signUp(params)
    .then(
      response => {
        dispatch(logIn(response.data))
        setUser(response.data)
        dispatch(push("/"))
      },
      error => {
        console.log(error.response)
        dispatch(failedSignUp(error.response.data.errors))
    })
}
