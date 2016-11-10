import expect from 'expect';
import * as actions from '../../../js/store/admin/actions';
import * as types from '../../../js/store/admin/action_types';
import reducer from '../../../js/store/admin/reducer';

const initialState = {}

describe('users reducer', () => {
  it('should return the initial state', () => {
    expect(
      reducer(undefined, {})
    ).toEqual(initialState);
  });

  it('should handle USERS_FETCHED', () => {
    const list = [{id: 1}, {id: 2}, {id: 3}];
    expect(
      reducer(initialState, {
        type: types.USERS_FETCHED,
        users: list
      })
    ).toEqual({users: list });

    expect(
      reducer({
        users: [{id: 1}]
      }, {
        type: types.USERS_FETCHED,
        users: list
      })
    ).toEqual( { users: list });
  });

  it('should handle USER_UPDATED', () => {
    expect(
      reducer({
        users: [ {id: 1, role: "admin", email: "user1@example.com"},
                {id: 2, role: "user_manager", email: "user2@example.com"},
              ]
      }, {
        type: types.USER_UPDATED,
        id: 2,
        role: "admin",
        email: "admin@example.com"
      })
    ).toEqual({
      users: [
        {id: 1, role: "admin", email: "user1@example.com"},
        {id: 2, role: "admin", email: "admin@example.com"}
      ]
    });

  });

  it('should handle USER_ADDED', () => {
    expect(
      reducer({
        users: [
          {id: 1, role: "admin", email: "user1@example.com"},
          {id: 2, role: "user_manager", email: "user2@example.com"},
        ]
      }, {
        type: types.USER_ADDED,
        id: 3,
        email: "admin@example.com",
        role: "admin"
      })
    ).toEqual({
      users: [
        {id: 1, role: "admin", email: "user1@example.com"},
        {id: 2, role: "user_manager", email: "user2@example.com"},
        {id: 3, role: "admin", email: "admin@example.com"}
      ]
    });

  });

  it('should handle DELETE_USER', () => {
    expect(
      reducer({
        users: [ {id: 1, role: "admin", email: "user1@example.com"},
                {id: 2, role: "user_manager", email: "user2@example.com"},
              ]
      }, {
        type: types.DELETE_USER,
        userId: 3
      })
    ).toEqual({ users: [ {id: 1, role: "admin", email: "user1@example.com"},
                        {id: 2, role: "user_manager", email: "user2@example.com"},
                      ]
              });

  });




});
