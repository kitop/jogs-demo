import React from "react";
import { connect } from "react-redux";
import * as actions from "../../store/jogs/actions";
import JogsList from "./JogsList";

class JogsContainer extends React.Component {

  componentWillMount() {
    this.props.fetchJogs();
  }

  render() {
    return (
      <div>
        <JogsList
          jogs={ this.props.jogs }
        />
      </div>
    )
  }

  renderJog(jog) {
    return <Jog key={jog.id} jog={jog} />
  }
}

const mapStateToProps = (state) => ({
  jogs: state.jogs.list
})

const mapDispatchToProps = (dispatch) => ({
  fetchJogs: () => { dispatch(actions.fetchJogs()) }
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(JogsContainer);
