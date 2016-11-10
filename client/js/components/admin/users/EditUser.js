import React from "react";
import { connect } from "react-redux";
import * as actions from "../../../store/admin/actions";
import find from "lodash/find";
import AdminLayout from "../Layout";
import UserForm from "./UserForm";

class EditUser extends React.Component {
  componentWillMount() {
    this.props.fetchUsers();
  }

  render() {
    let user = find(this.props.users, user => user.id == parseInt(this.props.params.id))
    let children = user ?
        <UserForm
          onSubmit={ this.props.onSubmit }
          { ...user }
        /> :
        <div>Loading...</div>

    return (
      <AdminLayout>
        <h1>Edit User</h1>
        { children }
      </AdminLayout>
    )
  }
}

const mapStateToProps = (state) => ({
  users: state.admin.users
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  fetchUsers: () => { dispatch(actions.fetchUsers()) },
  onSubmit: (params) => { dispatch(actions.editUser(ownProps.params.id, params)) }
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditUser);

