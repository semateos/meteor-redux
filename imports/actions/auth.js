import { Meteor } from 'meteor/meteor';
import Accounts from 'meteor-apollo-accounts-client';
import Router from 'react-router-redux';

const SUCCESS_FLASH_TIMEOUT = 2500;
const internals = {};

internals.flashSuccessThenInit = (dispatch, key, successMethod, successVal) => {
  dispatch(successMethod(successVal));
  setTimeout(() => {
    dispatch(internals.setInitVal(key));
  }, SUCCESS_FLASH_TIMEOUT);
};

internals.setInitVal = (key) => ({
  payload: key,
  type: 'AUTH_SET_INIT_VAL',
});

export function initAuth() {
  return {
    payload: Meteor.userId(),
    type: 'AUTH_INIT',
  };
}

export function signup(creds) {
  return (dispatch) => {
    const { email, password } = creds;
    // Define user profile here
    const profile = {
      name: email,
    };
    dispatch(exports.signupPending(true));
    return Accounts.createUser({ email, password, profile })
      .then((response) => {
        dispatch(exports.signupPending(false));
        internals.flashSuccessThenInit(dispatch, 'signup', exports.signupSuccess, response);
        return dispatch(Router.push('/tasks'));
      })
      .catch((err) => {
        dispatch(exports.signupPending(false));
        dispatch(exports.loginFail(err));
        return dispatch(Router.push('/'));
      });
  };
}

export function signupPending(val) {
  return {
    payload: val,
    type: 'AUTH_SIGNUP_PENDING',
  };
}

export function signupSuccess(response) {
  return {
    payload: response,
    type: 'AUTH_SIGNUP_SUCCESS',
  };
}

export function signupFail(err) {
  return {
    payload: err,
    type: 'AUTH_SIGNUP_FAIL',
  };
}

export function login(creds) {
  return (dispatch) => {
    const { email, password } = creds;
    dispatch(exports.loginPending(true));
    return Accounts.loginWithPassword({ email, password })
      .then((response) => {
        dispatch(exports.loginPending(false));
        internals.flashSuccessThenInit(dispatch, 'login', exports.loginSuccess, response);
        dispatch(exports.loginSuccess(response));
        return dispatch(Router.push('/tasks'));
      })
      .catch((err) => {
        dispatch(exports.loginPending(false));
        dispatch(exports.loginFail(err));
        return dispatch(Router.push('/'));
      });
  };
}

export function loginPending(val) {
  return {
    payload: val,
    type: 'AUTH_LOGIN_PENDING',
  };
}

export function loginSuccess(response) {
  return {
    payload: response,
    type: 'AUTH_LOGIN_SUCCESS',
  };
}

export function loginFail(err) {
  return {
    payload: err,
    type: 'AUTH_LOGIN_FAIL',
  };
}

export function logout() {
  return (dispatch) => {
    dispatch(exports.logoutPending(true));
    return Accounts.logout()
      .then((response) => {
        dispatch(exports.logoutPending(false));
        internals.flashSuccessThenInit(dispatch, 'logout', exports.logoutSuccess, response);
        return dispatch(Router.push('/'));
      })
      .catch((err) => {
        dispatch(exports.logoutPending(false));
        return dispatch(exports.logoutFail(err));
      });
  };
}

export function logoutPending(val) {
  return {
    payload: val,
    type: 'AUTH_LOGOUT_PENDING',
  };
}

export function logoutSuccess(response) {
  return {
    payload: response,
    type: 'AUTH_LOGOUT_SUCCESS',
  };
}

export function logoutFail(err) {
  return {
    payload: err,
    type: 'AUTH_LOGOUT_FAIL',
  };
}
