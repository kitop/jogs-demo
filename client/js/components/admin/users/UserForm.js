import React from "react";
import { Link } from "react-router";
import { connect } from "react-redux";
import isEmpty from "lodash/isEmpty";
import * as actions from "../../../store/admin/actions";
import { formatRole } from "../../../utils/formatters";
import styles from "./user_form.scss";

class UserForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      errors: {
        general: this.props.error
      }
    }
  }
  componentWillReceiveProps(nextProps) {
    this.setState({
      errors: {
        general: nextProps.error
      }
    })
  }

  componentWillUnmount() {
    this.props.clearFormError();
  }

  validate(params) {
    let errors = {}
    if(!params.email || !params.email.match(/@/)) {
      errors["email"] = "Please enter a valid email"
    }
    if(params.password != params.password_confirmation) {
      errors["password_confirmation"] = "Password doesn't match confirmation"
    }

    return errors;
  }


  handleSubmit(e) {
    e.preventDefault();
    let params = {
      email: this.refs.email.value,
      role: this.refs.role.value,
      password: this.refs.password.value,
      password_confirmation: this.refs.password_confirmation.value,
    }

    let errors = this.validate(params)
    if(isEmpty(errors)){
      this.props.clearFormError();
      this.props.onSubmit(params);
      this.setState({ errors: {} })
    } else {
      this.setState({ errors: errors })
    }
  }

  errorsFor(attribute) {
    return (
      <div className={ styles.error }>
        { this.state.errors && this.state.errors[attribute] }
      </div>
    )
  }

  render() {
    let roles = ["user", "user_manager"];
    if(this.props.currentUser.role == "admin"){
      roles.push("admin")
    }

    return (
      <form className={ styles.root } onSubmit={ this.handleSubmit.bind(this) }>
        <div>
          <label>Email</label>
          <input type="email" ref="email" defaultValue={ this.props.email } />
          { this.errorsFor("email") }
        </div>
        <div>
          <label>Role</label>
          <select ref="role" defaultValue={ this.props.role }>
            {
              roles.map(role => <option value={role} key={role}>{ formatRole(role) }</option>)
            }
          </select>
          { this.errorsFor("role") }
        </div>
        <div>
          <label>Password</label>
          <input type="password" ref="password" defaultValue={ this.props.password } />
          { this.errorsFor("password") }
        </div>
        <div>
          <label>Password Confirmation</label>
          <input type="password" ref="password_confirmation" defaultValue={ this.props.passwordConfirmation } />
          { this.errorsFor("password_confirmation") }
        </div>
        <div className={ styles.submit }>
          { this.errorsFor("general") }
          <button type="submit">Save</button>
          <Link to="/admin" className={ styles.cancel }>Cancel</Link>
        </div>
      </form>
    )
  }
}

const mapStateToProps = (state) => ({
  error: state.admin.userError,
  currentUser: state.user,
})

const mapDispatchToProps = (dispatch) => ({
  clearFormError: () => { dispatch(actions.clearUserFormError()) },
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserForm);
