import * as actions from "./action_types";
import ApiClient from "../../utils/api_client";

const jogsFetched = (response) => ({
  type: actions.JOGS_FETCHED,
  list: response
})

export const fetchJogs = () => (dispatch) => (
  ApiClient.getJogs().then(
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
      dispatch(fetchJogs());
    },
    error => {
      console.log("error", error)
    })
)
