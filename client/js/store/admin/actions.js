import { push } from "react-router-redux";
import * as actions from "./action_types";
import ApiClient from "../../utils/admin/api_client.js";

const usersFetched = (response) => ({
  type: actions.USERS_FETCHED,
  users: response
});

const userAdded = (data) => ({
  ...data,
  type: actions.USER_ADDED,
})

const userRemoved = (id) => ({
  type: actions.USER_REMOVED,
  id: id
})

const userFormError = (errors) => ({
  type: actions.USER_FORM_ERROR,
  error: errors.join(". ")
})

export const clearUserFormError = () => ({
  type: actions.CLEAR_USER_FORM_ERROR
})

export const fetchUsers = () => (dispatch) => {
  ApiClient.getUsers().then(
    response => {
      dispatch(usersFetched(response.data));
    },
    error => {
      // TODO handle unauthorized
      console.log(error)
    }
  )
}

export const createUser = (params) => (dispatch) => {
  ApiClient.createUser(params).then(
    response => {
      dispatch(userAdded(response.data))
      dispatch(push("/admin"))
    },
    error => {
      // TODO handle unauthorized
      console.log(error)
      dispatch(userFormError(error.response.data.errors))
    })
}

export const deleteUser = (id) => (dispatch) => {
  ApiClient.deleteUser(id).then(
    response => {
      dispatch(userRemoved(id));
    },
    error => {
      // TODO handle unauthorized
      console.log(error)
    }
  )
}
