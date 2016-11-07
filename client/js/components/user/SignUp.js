import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router";
import { onSubmitSignUp } from "../../store/users/actions";
import UserLayout from "./UserLayout";
import styles from "./styles.scss";

class SignIn extends React.Component {
  onSubmitForm(e) {
    e.preventDefault();
    this.props.onSubmitSignUp({
      email: this.refs.email.value,
      password: this.refs.password.value,
      password_confirmation: this.refs.password_confirmation.value
    });
  }

  render() {
    return (
      <UserLayout>
        <h1>Sign In</h1>
        <form className={styles.form} onSubmit={this.onSubmitForm.bind(this)}>
          <div className={styles.error}>
            { this.props.user.errors && this.props.user.errors.join(". ") }
          </div>
          <div>
            <label htmlFor="email">Email</label>
            <input type="text" id="email" ref="email" />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input type="password" id="password" ref="password" />
          </div>
          <div>
            <label htmlFor="password_confirmation">Password</label>
            <input type="password" id="password_confirmation" ref="password_confirmation" />
          </div>
          <div className={styles.submit}>
            <button type="submit">Sign Up</button>
          </div>
          <Link to="sign_in">Sign In</Link>
        </form>
      </UserLayout>
    )
  }
}

const mapStateToProps = (state) => ({
  user: state.user
})

const mapDispatchToProps = (dispatch) => ({
  onSubmitSignUp: (params) => {
    dispatch(onSubmitSignUp(params));
  }
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignIn);
