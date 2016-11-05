import React from "react";
import { connect } from "react-redux";
import { onSubmitLogIn } from "../../actions";
import UserLayout from "./UserLayout";
import styles from "./styles.scss";

class SignIn extends React.Component {
  onSubmitForm(e) {
    e.preventDefault();
    this.props.onSubmitLogIn({
      email: this.refs.email.value,
      password: this.refs.password.value
    })
  }

  render() {
    return (
      <UserLayout>
        <h1>Sign In</h1>
        <form className={styles.form} onSubmit={this.onSubmitForm.bind(this)}>
          <div className={styles.error}>
            { this.props.user.logInError }
          </div>
          <div>
            <label htmlFor="email">Email</label>
            <input type="text" id="email" ref="email" />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input type="password" id="password" ref="password" />
          </div>
          <div className={styles.submit}>
            <button type="submit">Sign In</button>
          </div>
        </form>
      </UserLayout>
    )
  }
}

const mapStateToProps = (state) => ({
  user: state.user
})

const mapDispatchToProps = (dispatch) => ({
  onSubmitLogIn: (params) => {
    dispatch(onSubmitLogIn(params));
  }
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignIn);

