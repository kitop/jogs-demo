import * as actions from "../constants/action_types";
import { setUser } from "../utils/user";
import ApiClient from "../utils/api_client";

export const logIn = (response) => ({
  type: actions.LOG_IN,
  id: response.id,
  role: response.role,
  token: response.token,
  email: response.email,
})

export const onSubmitLogIn = (email, password) => (dispatch, getState) => {
  ApiClient.logIn(email, password)
    .then(response => {
        dispatch(logIn(response.data))
        setUser(response.data)
      },
      error => {
        console.log("Something went wrong", error)
      })
}
