import React from "react";
import { connect } from "react-redux";
import { onLogOut } from "../../store/user/actions";
import styles from "./navbar.scss";

class Navbar extends React.Component {
  render () {
    return (
      <div className={ styles.root }>
        <div className="container">
          <div className={styles.leftSide}>
            <div className={styles.logo}>
              Jogs Tracker Admin
            </div>
          </div>
          <div className={styles.rightSide}>
            <a onClick={this.props.onLogOut}>Log out</a>
          </div>
        </div>
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => ({
  onLogOut: () => {
    dispatch(onLogOut())
  }
})

export default connect(
  null,
  mapDispatchToProps
)(Navbar);
