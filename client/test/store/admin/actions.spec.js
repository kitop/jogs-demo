import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moxios from 'moxios';
import expect from 'expect';
import { push } from "react-router-redux";
import * as types from '../../../js/store/admin/action_types';
import * as actions from '../../../js/store/admin/actions';

import xhr from '../../../js/utils/http_client';


const middlewares = [ thunk ];
const mockStore = configureMockStore(middlewares);

describe("admin actions", () => {
  beforeEach(function () {
    moxios.install(xhr)
  });

  afterEach(function () {
    moxios.uninstall(xhr)
  });

  it("sends a CLEAR_USER_FORM_ERROR", () => {
    const expectedAction = { type: types.CLEAR_USER_FORM_ERROR }

    expect(actions.clearUserFormError()).toEqual(expectedAction)
  });

  it("creates a USERS_FETCHED after fetching users", () => {
    moxios.stubRequest(/\.*\/users/, {
      status: 200,
      response: [{ id: 1 }, { id: 2 }]
    })

    const expectedActions = [
      { type: types.USERS_FETCHED, users: [{ id: 1 }, { id: 2 }] },
    ]
    const store = mockStore()

    store.dispatch(actions.fetchUsers())
    moxios.wait(() => {
      expect(store.getActions()).toEqual(expectedActions)
    }, 0)
  });

  it("creates a USER_ADDED after creating user", () => {
    moxios.stubRequest(/\.*\/users/, {
      status: 200,
      response: { id: 1 }
    })

    const expectedActions = [
      { type: types.USER_ADDED, id: 1 },
      push("/admin")
    ]
    const store = mockStore()

    store.dispatch(actions.createUser({email: "foo@bar.com"}))
    moxios.wait(() => {
      expect(store.getActions()).toEqual(expectedActions)
    }, 0)
  });

  it("creates a USER_UPDATED after updating user", () => {
    moxios.stubRequest(/\.*\/users\/1/, {
      status: 200,
      response: { id: 1 }
    })

    const expectedActions = [
      { type: types.USER_UPDATED, id: 1 },
      push("/admin")
    ]
    const store = mockStore()

    store.dispatch(actions.editUser(1, {email: "foo@bar.com"}))
    moxios.wait(() => {
      expect(store.getActions()).toEqual(expectedActions)
    }, 0)
  });

  it("creates a USER_REMOVED after deleting", () => {
    moxios.stubRequest(/\.*\/users\/1/, {
      status: 204,
      response: { }
    })

    const expectedActions = [
      { type: types.USER_REMOVED, id: 1 },
    ]
    const store = mockStore()

    store.dispatch(actions.deleteUser(1))
    moxios.wait(() => {
      expect(store.getActions()).toEqual(expectedActions)
    }, 0)
  });

});
