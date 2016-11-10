import * as actions from "./action_types";
import ApiClient from "../../utils/admin/api_client.js";

const usersFetched = (response) => ({
  type: actions.USERS_FETCHED,
  users: response
});

const userRemoved = (id) => ({
  type: actions.USER_REMOVED,
  id: id
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
