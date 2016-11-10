import React from "react";
import { Link } from "react-router"
import { formatRole } from "../../../utils/formatters";
import styles from "./user_list.scss"

class User extends React.Component {

  deleteUser(user) {
    this.props.onDeleteUser(user.id);
  }

  render() {
    let user = this.props.user;
    let linkToEdit = user.role == "user" && this.props.currentUser.role == "admin" ?
          <Link className={styles.action} to={ `/admin/users/${user.id}/jogs` }>Jogs</Link> : ""
    return (
      <tr>
        <td>{ user.id }</td>
        <td>{ user.email }</td>
        <td>{ formatRole(user.role) }</td>
        <td className={styles.actions}>
          { linkToEdit }
          <Link className={styles.action} to={ `/admin/users/${user.id}/edit` }>Edit</Link>
          <a className={styles.action} onClick={() => this.deleteUser(user)}>Delete</a>
        </td>
      </tr>
    )
  }
}

export default User;
