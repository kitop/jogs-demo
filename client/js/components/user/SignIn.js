import React from "react";
import UserLayout from "./UserLayout";
import styles from "./styles.scss";

class SignIn extends React.Component {
  render() {
    return (
      <UserLayout>
        <h1>Sign In</h1>
        <div className={styles.form}>
          <div>
            <label htmlFor="email">Email</label>
            <input type="email" name="email" id="email" />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input type="password" name="password" id="password" />
          </div>
          <div className={styles.submit}>
            <button>Sign In</button>
          </div>
        </div>
      </UserLayout>
    )
  }
}

export default SignIn;
