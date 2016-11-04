import React from "react";
import styles from "./styles.scss";

const UserLayout = ({ children }) => (
  <div className="container">
    <div className={styles.logo}>
      Jogs Tracker
    </div>
    <div className={styles.content}>
      { children }
    </div>
  </div>
);

export default UserLayout;
