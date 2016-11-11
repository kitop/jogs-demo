import expect from 'expect';
import * as types from '../../../js/store/user/action_types';
import reducer from '../../../js/store/user/reducer';

const initialState = {}

describe('user reducer', () => {
  it('returns the initial state', () => {
    expect(
      reducer(undefined, {})
    ).toEqual(initialState);
  });

  it('handles LOG_IN', () => {
    expect(
      reducer(initialState, {
        type: types.LOG_IN,
        id: 1,
        role: "user",
        email: "user@example.com",
        token: "123"
      })
    ).toEqual({
      id: 1,
      role: "user",
      email: "user@example.com",
      token: "123"
    })
  });


  it('handles LOG_OUT', () => {
    expect(
      reducer({
        id: 1,
        role: "user",
        email: "user@example.com",
        token: "123"
      }, {
        type: types.LOG_OUT
      })
    ).toEqual({ })
  });

  it("handles FAILED_LOG_IN", () => {
    expect(
      reducer(initialState, {
        type: types.FAILED_LOG_IN,
        errors: "test"
      })
    ).toEqual({
      errors: "test"
    })
  });

  it("handles FAILED_SIGN_UP", () => {
    expect(
      reducer(initialState, {
        type: types.FAILED_SIGN_UP,
        errors: "test"
      })
    ).toEqual({
      errors: "test"
    })
  });
});
