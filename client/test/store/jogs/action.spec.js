import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moxios from 'moxios';
import expect from 'expect';
import * as types from '../../../js/store/jogs/action_types';
import * as actions from '../../../js/store/jogs/actions';

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

  it('creates ADD_JOG after creating a jog', () => {
    const params = {
      date: "2016-11-15",
      duration: 3600,
      distance: 10000,
      average_speed: 2.77,
    }
    moxios.stubRequest(/\.*\/users\/1\/jogs/, {
      status: 200,
      response: {
        ...params,
        id: 1
      }
    })

    const expectedActions = [
      {
        type: types.ADD_JOG,
        id: 1,
        ...params
      }
    ]
    const store = mockStore()

    store.dispatch(actions.createJog(1, params))
    moxios.wait(() => {
      expect(store.getActions()).toEqual(expectedActions)
    })
  });

  it('creates EDIT_JOG after updating a jog', () => {
    const params = {
      date: "2016-11-15",
      duration: 3600,
      distance: 10000,
      average_speed: 2.77,
    }
    moxios.stubRequest(/\.*\/users\/1\/jogs\/2/, {
      status: 200,
      response: {
        ...params,
        id: 2
      }
    })

    const expectedActions = [
      {
        type: types.EDIT_JOG,
        id: 2,
        ...params
      }
    ]
    const store = mockStore()

    store.dispatch(actions.updateJog(1, 2, params))
    moxios.wait(() => {
      expect(store.getActions()).toEqual(expectedActions)
    })
  });

  it('creates DELETE_JOG after deleting a jog', () => {
    moxios.stubRequest(/\.*\/users\/1\/jogs\/2/, {
      status: 204,
      response: { }
    })

    const expectedActions = [
      {
        type: types.DELETE_JOG,
        id: 2,
      }
    ]
    const store = mockStore()

    store.dispatch(actions.deleteJog(1, 2))
    moxios.wait(() => {
      expect(store.getActions()).toEqual(expectedActions)
    })
  });

});
