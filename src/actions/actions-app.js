import * as type from '../constants/actions-app';
import * as api from '../util/api';

export function changeRoute(route) {
  return { type: type.CHANGE_ROUTE, route };
}

export function signin(username, password) {
  return dispatch => {
    dispatch({ type: type.SIGN_IN, status: 'start' });
    console.log("action signin","start")
    api.signin(username, password).then(data => {
      dispatch({ type: type.SIGN_IN, status: 'complete', data });
    }).catch(error => {
      dispatch({ type: type.SIGN_IN, status: 'error', error });
    });
  }
}

export function selectLayout(value) {
  return { type: type.SELECT_LAYOUT, value };
}
