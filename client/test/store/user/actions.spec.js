import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moxios from 'moxios';
import { push } from "react-router-redux";
import expect from 'expect';
import * as types from '../../../js/store/user/action_types';
import * as actions from '../../../js/store/user/actions';
import reducer from '../../../js/store/user/reducer';

import xhr from '../../../js/utils/http_client';


const middlewares = [ thunk ];
const mockStore = configureMockStore(middlewares);

describe("user actions", () => {
  beforeEach(function () {
    moxios.install(xhr)
  })

  afterEach(function () {
    moxios.uninstall(xhr)
  })

  it('creates LOG_IN when logging in was successful', () => {
    moxios.stubRequest(/\.*\/sessions/, {
      status: 200,
      response: { id: 1, email: "user@example.com", token: "abc", role: "user" }
    })

    const expectedActions = [
      { type: types.LOG_IN,  id: 1, email: "user@example.com", token: "abc", role: "user" },
      push("/")
    ]
    const store = mockStore({ routing: {} })

    store.dispatch(actions.onSubmitLogIn("user@example.com", "password"))
    return moxios.wait(() => {
      expect(store.getActions()).toEqual(expectedActions)
    })
  });

  it("creates LOG_OUT when signing out", () => {
    moxios.stubRequest(/\.*\/sessions/, {
      status: 200,
      response: { id: 1, email: "user@example.com", token: "abc", role: "user" }
    })

    const expectedActions = [
      { type: types.LOG_OUT },
      push("/sign_in")
    ]
    const store = mockStore({ })

    store.dispatch(actions.onLogOut())
    moxios.wait(() => {
      expect(store.getActions()).toEqual(expectedActions)
    })
  });

  it('creates LOG_IN when singin up was successful', () => {
    moxios.stubRequest(/\.*\/signup/, {
      status: 200,
      response: { id: 1, email: "user@example.com", token: "abc", role: "user" }
    })

    const expectedActions = [
      { type: types.LOG_IN, id: 1, email: "user@example.com", token: "abc", role: "user" },
      push("/")
    ]
    const store = mockStore({ routing: {} })

    store.dispatch(actions.onSubmitSignUp({ email: "foo@foo.com", password: "foo", password_confirmation: "foo" }))
    moxios.wait(() => {
      expect(store.getActions()).toEqual(expectedActions)
    })
  });

})
