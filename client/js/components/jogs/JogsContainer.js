import React from "react";
import { connect } from "react-redux";
import Jog from "./Jog";

class JogsContainer extends React.Component {

  render() {
    if(this.props.jogs == null) {
      return <div>Loading...</div>
    }
    if(this.props.length == 0) {
      return <div>No jogs logged yet!</div>
    }
    return (
      <div>
        { this.props.jogs.map(jog => this.renderJog(jog)) }
      </div>
    )
  }

  renderJog(jog) {
    return <Jog key={jog.id} jog={jog} />
  }
}

const mapStateToProps = () => ({
})

const mapDispatchToProps= () => ({
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(JogsContainer);
