import Immutable from 'seamless-immutable';
import * as type from '../constants/actions-app';
import * as page from '../constants/pages';

const initialRoute = [page.SIGNIN];

const initialState = Immutable({
  route: initialRoute,
  user: null,
});

function AppReducer(state = initialState, action) {
  switch (action.type) {
    case type.CHANGE_APP_PAGE:
      state = changeAppPage(state, action);
      break;
    case type.SIGN_IN:
      state = signinUser(state, action);
      break;
    case type.SELECT_LAYOUT:
      break;
    default:
      break;
  }
  return state;
}

function signinUser(state, action) {
  if (action.status === 'start') {
    // Show loading animation ?
  } else if (action.status === 'error') {
    // Display error message.
  } else if (action.status === 'complete') {
    state = state.set('user', action.data);
  }
  return state;
}

function changeAppPage(state, action) {
  const hash = action.value.match(/^[#\/]*(.*)/);
  const routes = (hash === null) ? initialRoute :
    hash[1].replace(/\/+/g, '/').split('/');
  return state.setIn(['route'], routes);
}

export default AppReducer;
