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
    case type.CHANGE_ROUTE:
      state = state.setIn(['route'], action.route);
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
    console.log("signIn complete ", state, action)
  }
  console.log('signinUser reducer', state)
  return state;
}

export default AppReducer;
