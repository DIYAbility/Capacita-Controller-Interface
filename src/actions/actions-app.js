import * as type from '../constants/actions-app';
import * as api from '../util/api';

export function changeRoute(route) {
  return { type: type.CHANGE_ROUTE, route };
}

export function signUp(name, email, password) {
  return  dispatch => {
    dispatch({ type: type.SIGN_UP, status: 'start'});
    api.signup(name, email, password).then(data => {
      dispatch({ type: type.SIGN_IN, status: 'complete', data});
    }).catch(error => {
      dispatch({ type: type.SIGN_UP, status:'error', error});
    })
  }
}

export function signin(email, password) {
  return dispatch => {
    dispatch({ type: type.SIGN_IN, status: 'start' });
    console.log("action signin","start", email, password)
    api.signin(email, password).then(data => {
      dispatch({ type: type.SIGN_IN, status: 'complete', data });
    }).catch(error => {
      dispatch({ type: type.SIGN_IN, status: 'error', error });
    });
  }
}

export function selectLayout(value) {
  return { type: type.SELECT_LAYOUT, value };
}
