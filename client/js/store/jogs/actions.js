import * as actions from "./action_types";
import { onLogOut } from "../users/actions";
import ApiClient from "../../utils/api_client";

const handleUnauthorized = (response, dispatch) => {
  if(response.status === 401){
    dispatch(onLogOut());
  }
};


const jogsFetched = (response) => ({
  type: actions.JOGS_FETCHED,
  list: response
})

const addJog = (data) => ({
  ...data,
  type: actions.ADD_JOG
})

const editJog = (data) => ({
  ...data,
  type: actions.EDIT_JOG
})

const deletedJog = (id) => ({
  type: actions.DELETE_JOG,
  id: id
})

export const fetchJogs = (userId, params) => (dispatch) => (
  ApiClient.getJogs(userId, params).then(
    response => {
      dispatch(jogsFetched(response.data))
    },
    error => {
      handleUnauthorized(error.response, dispatch)
    })
)

export const createJog = (userId, params) => (dispatch) => (
  ApiClient.createJog(userId, params).then(
    response => {
      dispatch(addJog(response.data));
    },
    error => {
      handleUnauthorized(error.response, dispatch)
    })
)

export const updateJog = (userId, id, params) => (dispatch) => (
  ApiClient.updateJog(userId, id, params).then(
    response => {
      dispatch(editJog(response.data));
    },
    error => {
      handleUnauthorized(error.response, dispatch)
    })
)

export const deleteJog = (userId, id) => (dispatch) => (
  ApiClient.deleteJog(userId, id).then(
    response => {
      dispatch(deletedJog(id));
    },
    error => {
      handleUnauthorized(error.response, dispatch)
    })
)
