import React from "react";
import { connect } from "react-redux";
import * as actions from "../../store/jogs/actions";
import JogsList from "./JogsList";
import JogsFilter from "./JogsFilter";
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
        <JogsFilter />
        <JogsList
          jogs={ this.props.jogs }
          onEditJog={ this.props.onEditJog }
          onDeleteJog={ this.props.onDeleteJog }
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
  onDeleteJog: (id) => { dispatch(actions.deleteJog(id)) },
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(JogsContainer);
