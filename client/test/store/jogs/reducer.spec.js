import expect from 'expect';
import * as types from '../../../js/store/jogs/action_types';
import reducer from '../../../js/store/jogs/reducer';

const initialState = {}

describe('jogs reducer', () => {
  it('returns the initial state', () => {
    expect(
      reducer(undefined, {})
    ).toEqual(initialState);
  });

  it("handles JOGS_FETCHED", () => {
    expect(
      reducer(initialState, {
        type: types.JOGS_FETCHED,
        list: [{ id: 1, id: 2 }]
      })
    ).toEqual({
      list: [{ id: 1, id: 2 }]
    })
  });

  it("handles ADD_JOG", () => {
    expect(
      reducer({
        list: [{id: 1}]
      }, {
        type: types.ADD_JOG,
        id: 2,
        date: "2016-10-10",
        duration: 3600,
        distance: 10000,
        average_speed: 2.77
      })
    ).toEqual({
      list: [
        { id: 1 },
        {
          id: 2,
          date: "2016-10-10",
          duration: 3600,
          distance: 10000,
          average_speed: 2.77
        }
      ]
    })
  });

  it("handles EDIT_JOG", () => {
    expect(
      reducer({
        list: [{id: 1}]
      }, {
        type: types.EDIT_JOG,
        id: 1,
        date: "2016-10-10",
        duration: 3600,
        distance: 10000,
        average_speed: 2.77
      })
    ).toEqual({
      list: [
        {
          id: 1,
          date: "2016-10-10",
          duration: 3600,
          distance: 10000,
          average_speed: 2.77
        }
      ]
    })
  });

  it("handles DELETE_JOG", () => {
    expect(
      reducer({
        list: [{id: 1}, { id: 2 }]
      }, {
        type: types.DELETE_JOG,
        id: 2
      })
    ).toEqual({
      list: [ { id: 1 } ]
    })
  });

  it("handles CLEAR_JOGS", () => {
    expect(
      reducer({
        list: [{id: 1}, { id: 2 }]
      }, {
        type: types.CLEAR_JOGS
      })
    ).toEqual({ })
  });

});
