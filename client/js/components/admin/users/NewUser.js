import React from "react";
import { connect } from "react-redux";
import * as actions from "../../../store/admin/actions";
import AdminLayout from "../Layout";
import UserForm from "./UserForm";

class NewUser extends React.Component {
  render() {
    return (
      <AdminLayout>
        <h1>New User</h1>
        <UserForm
          onSubmit={ this.props.onSubmit }
        />
      </AdminLayout>
    )
  }
}

const mapDispatchToProps = (dispatch) => ({
  onSubmit: (params) => { dispatch(actions.createUser(params)) }
})

export default connect(
  null,
  mapDispatchToProps
)(NewUser);
