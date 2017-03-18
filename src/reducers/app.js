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

function changeAppPage(state, action) {
  const hash = action.value.match(/^[#\/]*(.*)/);
  const routes = (hash === null) ? initialRoute :
    hash[1].replace(/\/+/g, '/').split('/');
  return state.setIn(['route'], routes);
}

function moveControl(state, move) {
  const path = ['layouts', state.activeLayoutIndex, 'grid', move.control];
  if (state.layouts[state.activeLayoutIndex].grid[move.control] === undefined) {
    state = state.setIn(path, { control: move.control, instances: [] });
  }
  path.push('instances');
  path.push(
    (move.index === -1) ?
    state.layouts[state.activeLayoutIndex].grid[move.control].instances.length :
    move.index
  );
  state = state.setIn(path, {
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
