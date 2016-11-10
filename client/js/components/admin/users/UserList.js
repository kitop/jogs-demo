import React from "react";
import { connect } from "react-redux";
import * as actions from "../../../store/admin/actions";
import AdminLayout from "../Layout";
import User from "./User";

class AdminUserList extends React.Component {
  componentWillMount() {
    this.props.fetchUsers();
  }

  renderUsers() {
    if(this.props.users) {
      return this.props.users.map(u => this.renderUser(u))
    } else if(this.props.users == null) {
      return <tr><td colSpan="4">Loading...</td></tr>
    } else if(this.props.users.length == 0) {
      return <tr><td colSpan="4">No users</td></tr>
    }
  }

  renderUser(user) {
    return(
      <User
        key={ user.id }
        user={ user }
        onDeleteUser={ this.props.onDeleteUser }
      />
    )
  }

  render() {
    return (
      <AdminLayout>
        <h1>Users</h1>
        <table>
          <thead>
            <tr>
              <th>Id</th>
              <th>Email</th>
              <th>Role</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            { this.renderUsers() }
          </tbody>
        </table>
      </AdminLayout>
    )
  }
}

const mapStateToProps = (state) => ({
  users: state.admin.users
});

const mapDispatchToProps = (dispatch) => ({
  fetchUsers: () => { dispatch(actions.fetchUsers()) },
  onDeleteUser: (id) => { dispatch(actions.deleteUser(id)) },
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AdminUserList);
