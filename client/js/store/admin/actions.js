import { push } from "react-router-redux";
import { onLogOut } from "../user/actions";
import * as actions from "./action_types";
import ApiClient from "../../utils/admin/api_client.js";

const handleUnauthorized = (response, dispatch) => {
  if(response.status === 401){
    dispatch(onLogOut());
  }
};

const usersFetched = (response) => ({
  type: actions.USERS_FETCHED,
  users: response
});

const userAdded = (data) => ({
  ...data,
  type: actions.USER_ADDED,
})

const userUpdated = (data) => ({
  ...data,
  type: actions.USER_UPDATED,
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
      handleUnauthorized(error.response, dispatch)
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
      handleUnauthorized(error.response, dispatch)
      dispatch(userFormError(error.response.data.errors))
    })
}

export const editUser = (id, params) => (dispatch) => {
  ApiClient.editUser(id, params).then(
    response => {
      dispatch(userUpdated(response.data))
      dispatch(push("/admin"))
    },
    error => {
      handleUnauthorized(error.response, dispatch)
      dispatch(userFormError(error.response.data.errors))
    })
}

export const deleteUser = (id) => (dispatch) => {
  ApiClient.deleteUser(id).then(
    response => {
      dispatch(userRemoved(id));
    },
    error => {
      handleUnauthorized(error.response, dispatch)
    }
  )
}

