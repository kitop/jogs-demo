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
import AdminNewUser from "../admin/users/NewUser";
import AdminEditUser from "../admin/users/EditUser";
import AdminJogs from "../admin/jogs/Jogs";
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
    this.requireAdminOrManager = this.requireAdminOrManager.bind(this)
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

  requireAdminOrManager(nextState, replace) {
    let user = this.authenticatedUser()
    if(!user.token && !(user.role == "admin" || user.role == "user_manager")) {
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
          <Route path="/admin" component={AdminUserList} onEnter={this.requireAdminOrManager } />
          <Route path="/admin/users/new" component={AdminNewUser} onEnter={this.requireAdminOrManager } />
          <Route path="/admin/users/:id/edit" component={AdminEditUser} onEnter={this.requireAdminOrManager } />
          <Route path="/admin/users/:userId/jogs" component={AdminJogs} onEnter={this.requireAdmin } />
        </Router>
      </Provider>
    )
  }
}

export default App;
