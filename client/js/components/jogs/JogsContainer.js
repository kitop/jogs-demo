import React from "react";
import { connect } from "react-redux";
import * as actions from "../../store/jogs/actions";
import JogsList from "./JogsList";
import NewJog from "./NewJog";

class JogsContainer extends React.Component {

  componentWillMount() {
    this.props.fetchJogs();
  }

  render() {
    return (
      <div>
        <NewJog
          onSubmitJog={this.props.onCreateJog}
        />
        <JogsList
          jogs={ this.props.jogs }
          onEditJog={ this.props.onEditJog }
        />
      </div>
    )
  }

  renderJog(jog) {
    return <Jog key={jog.id} jog={jog} />
  }
}

const mapStateToProps = (state) => ({
  jogs: state.jogs.list,
})

const mapDispatchToProps = (dispatch) => ({
  fetchJogs: () => { dispatch(actions.fetchJogs()) },
  onCreateJog: (params) => { dispatch(actions.createJog(params)) },
  onEditJog: (id, params) => { dispatch(actions.updateJog(id, params)) },
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(JogsContainer);
