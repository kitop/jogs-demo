import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moxios from 'moxios';
import { push } from "react-router-redux";
import expect from 'expect';
import * as types from '../../../js/store/jogs/action_types';
import * as actions from '../../../js/store/jogs/actions';
import reducer from '../../../js/store/jogs/reducer';

import xhr from '../../../js/utils/http_client';


const middlewares = [ thunk ];
const mockStore = configureMockStore(middlewares);

describe("jogs actions", () => {
  beforeEach(function () {
    moxios.install(xhr)
  })

  afterEach(function () {
    moxios.uninstall(xhr)
  })

  it('creates CLEAR_JOGS action', () => {
    const expectedAction = { type: types.CLEAR_JOGS }

    expect(actions.clearJogs()).toEqual(expectedAction)
  });

  it('creates JOGS_FETCHED after fetching jogs', () => {
    moxios.stubRequest(/\.*\/users\/1\/jogs/, {
      status: 200,
      response: [{ id: 1 }, { id: 2 }]
    })

    const expectedActions = [
      { type: types.JOGS_FETCHED, list: [{ id: 1 }, { id: 2 }] },
    ]
    const store = mockStore()

    store.dispatch(actions.fetchJogs(1))
    moxios.wait(() => {
      expect(store.getActions()).toEqual(expectedActions)
    })
  });

})
