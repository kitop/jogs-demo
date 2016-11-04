import React from "react";
import UserLayout from "./UserLayout";
import styles from "./styles.scss";

class SignIn extends React.Component {
  render() {
    return (
      <UserLayout>
        <h1>Sign In</h1>
        <div className={styles.form}>
          Email
        </div>
      </UserLayout>
    )
  }
}

export default SignIn;
