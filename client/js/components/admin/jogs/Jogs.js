import React from "react";
import { Link } from "react-router";
import AdminLayout from "../Layout";
import JogsContainer from "../../jogs/JogsContainer";
import styles from "./styles.scss"

class AdminJogs extends React.Component {
  render() {
    let userId = this.props.params.userId;
    return (
      <AdminLayout>
        <header className={styles.headerMessage}>
          <h2>
            Editing jogs from User ID <b>{ userId }</b>
          </h2>
          <Link to="/admin">&lsaquo; Go Back</Link>
        </header>
        <JogsContainer
          targetUserId={userId}
        />
      </AdminLayout>
    )
  }
}

export default AdminJogs;
