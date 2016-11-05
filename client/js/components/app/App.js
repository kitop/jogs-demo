import React from "react";
import { createStore, applyMiddleware, compose } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import { Router, Route, hashHistory, browserHistory } from "react-router";
import { syncHistoryWithStore, routerMiddleware } from "react-router-redux";
import Dashboard from "../dashboard/Dashboard";
import SignIn from "../user/SignIn";
import rootReducer from "../../reducers";
import "./app.scss";

import { createDevTools } from 'redux-devtools'
import LogMonitor from 'redux-devtools-log-monitor'
import DockMonitor from 'redux-devtools-dock-monitor'

const DevTools = createDevTools(
  <DockMonitor toggleVisibilityKey="ctrl-h"
    changePositionKey="ctrl-w">
  <LogMonitor />
  </DockMonitor>
)

const routeMiddleware = routerMiddleware(browserHistory);

const store = createStore(
  rootReducer,
  compose(applyMiddleware(routeMiddleware, thunk), DevTools.instrument())
);

const history = syncHistoryWithStore(browserHistory, store);

class App extends React.Component {
  constructor(props) {
    super(props)
    this.requireUser = this.requireUser.bind(this)
  }

  authenticatedUser() {
    return store.getState().user
  }

  requireUser(nextState, replace) {
    let user = this.authenticatedUser()
    if(!user.token) {
      replace({
        pathname: "/sign_in",
        state: { nextPathname: nextState.location.pathname }
      })
    } else if (user.role != "user") {
      replace({
        pathname: "/admin"
      })
    }
  }

  render() {
    return (
      <Provider store={store}>
        <div>
          <Router history={history}>
            <Route path="/" component={Dashboard} />
            <Route path="/sign_in" component={SignIn} />
          </Router>
          <DevTools />
        </div>
      </Provider>
    )
  }
}

export default App;
