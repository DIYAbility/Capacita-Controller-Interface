import * as type from '../constants/actions-app';

export function signin(username, password) {
  return dispatch => {
    dispatch({ type: type.SIGN_IN, status: 'start' });
    fetch('tmp/user.json').then(resp => {
      if (resp.ok) {
        resp.json().then(json => {
          dispatchComplete(dispatch, json);
        }).catch(error => {
          dispatchError(dispatch, error);
        });
      } else {
        dispatchError(dispatch, 'Sign in failed.');
      }
    }).catch(error => {
      dispatchError(dispatch, error);
    });
  }
}

function dispatchComplete(dispatch, data) {
  dispatch ({ type: type.SIGN_IN, status: 'complete', data });
}

function dispatchError(dispatch, error) {
  dispatch ({ type: type.SIGN_IN, status: 'error', error });
}
