import React from "react";
import { connect } from "react-redux";
import Jog from "./Jog";
import styles from "./styles.scss";

class JogsList extends React.Component {

  render() {
    let children = "";
    if(this.props.jogs == null) {
      children = <div className={ styles.loading }>Loading...</div>
    } else if(this.props.jogs.length == 0) {
      children = <div className={ styles.empty }>No jogs logged yet!</div>
    } else {
      children = this.props.jogs.map(jog => this.renderJog(jog))
    }
    return (
      <div className={ styles.list }>
        <h2>Jogs</h2>
        { children }
      </div>
    )
  }

  renderJog(jog) {
    return (
      <Jog
        key={jog.id}
        jog={jog}
        onEditJog={this.props.onEditJog}
        onDeleteJog={this.props.onDeleteJog}
      />
    )
  }
}

export default JogsList;
