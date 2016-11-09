import * as actions from "./action_types";
import ApiClient from "../../utils/api_client";

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

export const fetchJogs = (params) => (dispatch) => (
  ApiClient.getJogs(params).then(
    response => {
      dispatch(jogsFetched(response.data))
    },
    error => {
      console.log("error", error)
    })
)

export const createJog = (params) => (dispatch) => (
  ApiClient.createJog(params).then(
    response => {
      dispatch(addJog(response.data));
    },
    error => {
      console.log("error", error)
    })
)

export const updateJog = (id, params) => (dispatch) => (
  ApiClient.updateJog(id, params).then(
    response => {
      dispatch(editJog(response.data));
    },
    error => {
      console.log("error", error)
    })
)

export const deleteJog = (id) => (dispatch) => (
  ApiClient.deleteJog(id).then(
    response => {
      dispatch(deletedJog(id));
    },
    error => {
      console.log("error", error)
    })
)
