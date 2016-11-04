import React from "react";
import styles from "./navbar.scss";

class Navbar extends React.Component {
  render () {
    return (
      <div className={ styles.root }>
        <div className="container">
          <div className={styles.leftSide}>
            <div className={styles.logo}>
              Jogs Tracker
            </div>
            <div className={styles.rightSide}>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Navbar;
