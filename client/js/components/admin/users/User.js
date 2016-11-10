import React from "react";
import { formatRole } from "../../../utils/formatters";

class User extends React.Component {

  deleteUser(user) {
    this.props.onDeleteUser(user.id);
  }

  render() {
    let user = this.props.user;
    return (
      <tr>
        <td>{ user.id }</td>
        <td>{ user.email }</td>
        <td>{ formatRole(user.role) }</td>
        <td>
          <a onClick={() => this.deleteUser(user)}>Delete</a>
        </td>
      </tr>
    )
  }
}

export default User;
