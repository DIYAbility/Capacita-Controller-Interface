import Immutable from 'seamless-immutable';
import * as type from '../constants/actions-app';
import * as page from '../constants/pages';
import layoutTemplate from '../util/layout-template';

const initialRoute = [page.SIGNIN];

const initialState = Immutable({
  route: initialRoute,
  activeLayoutIndex: -1,
  layouts: [],
});

function AppReducer(state = initialState, action) {
  switch (action.type) {
    case type.CHANGE_APP_PAGE:
      state = changeAppPage(state, action);
      break;
    case type.CREATE_LAYOUT:
      const n = state.layouts.length;
      state = state.setIn(['activeLayoutIndex'], n);
      state = state.setIn(['layouts', n], layoutTemplate());
      break;
    case type.SELECT_LAYOUT:
      break;
    default:
      break;
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
