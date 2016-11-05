import React from "react";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import Dashboard from "../dashboard/Dashboard";
import SignIn from "../user/SignIn";
import rootReducer from "../../reducers";
import "./app.scss";

const store = createStore(
  rootReducer,
  applyMiddleware(thunk)
)

class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <SignIn />
      </Provider>
    )
  }
}

export default App;
