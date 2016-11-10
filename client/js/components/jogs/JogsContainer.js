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

  componentWillUnmount() {
    this.props.clearJogs();
  }

  render() {
    return (
      <div>
        <NewJog
          targetUserId={this.props.targetUserId}
          onSubmitJog={this.props.onCreateJog}
        />
        <JogsFilter
          targetUserId={this.props.targetUserId}
          onSubmitFilter={this.props.onSubmitFilter}
          onResetFilter={this.props.onResetFilter}
        />
        <JogsList
          targetUserId={ this.props.targetUserId }
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

const mapDispatchToProps = (dispatch, ownProps) => ({
  fetchJogs: () => { dispatch(actions.fetchJogs(ownProps.targetUserId)) },
  onCreateJog: (params) => { dispatch(actions.createJog(ownProps.targetUserId, params)) },
  onEditJog: (id, params) => { dispatch(actions.updateJog(ownProps.targetUserId, id, params)) },
  onDeleteJog: (id) => { dispatch(actions.deleteJog(ownProps.targetUserId, id)) },
  onSubmitFilter: (params) => { dispatch(actions.fetchJogs(ownProps.targetUserId, params)) },
  onResetFilter: () => { dispatch(actions.fetchJogs(ownProps.targetUserId)) },
  clearJogs: () => { dispatch(actions.clearJogs()) },
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(JogsContainer);
