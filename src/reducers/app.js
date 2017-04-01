import Immutable from 'seamless-immutable';
import * as type from '../constants/actions-app';
import * as page from '../constants/pages';
import layoutTemplate from '../util/layout-template';

const initialRoute = [page.SIGNIN];

const initialState = Immutable({
  route: initialRoute,
  activeLayoutIndex: -1,
  layouts: [],
  targetOffset: { x: 0, y: 0 },
  editMode: true,
});

function AppReducer(state = initialState, action) {
  switch (action.type) {
    case type.CHANGE_APP_PAGE:
      state = changeAppPage(state, action);
      break;
    case type.SIGN_IN:
      state = signinUser(state, action);
      break;
    case type.CREATE_LAYOUT:
      const n = state.layouts.length;
      state = state.setIn(['activeLayoutIndex'], n);
      state = state.setIn(['layouts', n], layoutTemplate());
      break;
    case type.SELECT_LAYOUT:
      break;
    case type.SAVE_LAYOUT:
      break;
    case type.TOGGLE_EDIT_MODE:
      state = state.set('editMode', action.value);
      break;
    case type.MOVE_CONTROL:
      state = moveControl(state, action.value);
      break;
    case type.UPDATE_TARGET_OFFSET:
      state = updateTargetOffset(state, action);
      break;
    case type.CHANGE_LAYOUT_DEVICE:
      state = state.setIn(['layouts', state.activeLayoutIndex, 'device'], action.value);
      break;
    case type.CHANGE_LAYOUT_VIEW:
      state = state.setIn(['layouts', state.activeLayoutIndex, 'view'], action.value);
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
    console.error(action.error);
  } else if (action.status === 'complete') {
    console.log(action.data);
  }
  return state;
}

function changeAppPage(state, action) {
  const hash = action.value.match(/^[#\/]*(.*)/);
  const routes = (hash === null) ? initialRoute :
    hash[1].replace(/\/+/g, '/').split('/');
  return state.setIn(['route'], routes);
}

function moveControl(state, move) {
  const gridArray = state.layouts[state.activeLayoutIndex].grid[move.device];
  const gridPath = ['layouts', state.activeLayoutIndex, 'grid', move.device, gridArray.length];
  state = state.setIn(gridPath, {
    name: move.control,
    x: move.x + state.targetOffset.x,
    y: move.y + state.targetOffset.y,
  });
  return state;
}

function updateTargetOffset(state, action) {
  state = state.setIn(['targetOffset', 'x'], action.x);
  state = state.setIn(['targetOffset', 'y'], action.y);
  return state;
}

export default AppReducer;
