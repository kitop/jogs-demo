import React from "react";
import { createStore, applyMiddleware, compose } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import { Router, Route, hashHistory, browserHistory } from "react-router";
import { syncHistoryWithStore, routerMiddleware } from "react-router-redux";
import Dashboard from "../dashboard/Dashboard";
import SignIn from "../user/SignIn";
import SignUp from "../user/SignUp";
import AdminUserList from "../admin/users/UserList";
import rootReducer from "../../store/reducer";
import "./app.scss";

const routeMiddleware = routerMiddleware(browserHistory);

const store = createStore(
  rootReducer,
  compose(applyMiddleware(routeMiddleware, thunk))
);

const history = syncHistoryWithStore(browserHistory, store);

class App extends React.Component {
  constructor(props) {
    super(props)
    this.requireUser = this.requireUser.bind(this)
    this.requireAdmin = this.requireAdmin.bind(this)
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

  requireAdmin(nextState, replace) {
    let user = this.authenticatedUser()
    if(!user.token && !user.role == "admin") {
      replace({
        pathname: "/sign_in",
        state: { nextPathname: nextState.location.pathname }
      })
    }
  }

  render() {
    return (
      <Provider store={store}>
        <Router history={history}>
          <Route path="/" component={Dashboard} onEnter={ this.requireUser }/>
          <Route path="/sign_in" component={SignIn} />
          <Route path="/sign_up" component={SignUp} />
          <Route path="/admin" component={AdminUserList} onEnter={this.requireAdmin } />
        </Router>
      </Provider>
    )
  }
}

export default App;
