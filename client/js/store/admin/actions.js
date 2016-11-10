import * as actions from "./action_types";
import ApiClient from "../../utils/admin/api_client.js";

const usersFetched = (response) => ({
  type: actions.USERS_FETCHED,
  users: response
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
