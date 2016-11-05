import React from "react";
import { connect } from "react-redux";
import { onSubmitLogIn } from "../../actions";
import UserLayout from "./UserLayout";
import styles from "./styles.scss";

class SignIn extends React.Component {
  onSubmitForm(e) {
    this.props.onSubmitLogIn({
      email: this.refs.email.value,
      password: this.refs.password.value
    })
  }

  render() {
    return (
      <UserLayout>
        <h1>Sign In</h1>
        <div className={styles.form}>
          <div>
            <label htmlFor="email">Email</label>
            <input type="text" name="email" id="email" ref="email" />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input type="password" name="password" id="password" ref="password" />
          </div>
          <div className={styles.submit}>
            <button onClick={this.onSubmitForm.bind(this)}>Sign In</button>
          </div>
        </div>
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

