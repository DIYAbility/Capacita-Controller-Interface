import Immutable from 'seamless-immutable';
import { CHANGE_ROUTE } from '../constants/actions-app';
import * as type from '../constants/actions-layout';
import { LAYOUT } from '../constants/pages';
import { isEqual } from 'lodash';

let created = 0;

const initialState = Immutable({
  data: {
    id: null,
    name: null,
    device: 'xbox',
    view: 'detailed',
    mode: 'edit',
    grid: {
      xbox: {},
      ps4: {},
    },
  },
  start: null,
  ui: {
    targetOffset: { x: 0, y: 0 },
    dirty: false,
  }
});

function LayoutReducer(state = initialState, action) {
  switch (action.type) {
    case CHANGE_ROUTE:
      state = (action.route[0] === LAYOUT) ? state :
        state.setIn(['ui', 'dirty'], false);
      break;
    case type.CREATE_LAYOUT:
      state = createLayout(state, action);
      break;
    case type.SAVE_LAYOUT:
      state = fetchLayout(state, action);
      break;
    case type.FETCH_LAYOUT:
      state = fetchLayout(state, action);
      break;
    case type.MOVE_CONTROL:
      state = moveControl(state, action.value);
      break;
    case type.UPDATE_TARGET_OFFSET:
      state = updateTargetOffset(state, action);
      break;
    case type.CHANGE_EDIT_MODE:
      state = changeEditMode(state, action);
      break;
    case type.CHANGE_DEVICE:
      state = state.setIn(['data', 'device'], action.value);
      break;
    case type.CHANGE_VIEW:
      state = state.setIn(['data', 'view'], action.value);
      break;
    default:
      break;
  }
  return state;
}

function createLayout(state, action) {
  const name = `Untitled ${++created}`;
  state = state.set('data', initialState.data);
  state = state.set('start', initialState.data);
  state = state.setIn(['data', 'name'], name);
  state = state.setIn(['start', 'name'], name);
  state = state.setIn(['ui', 'dirty'], false);
  return state;
}

function fetchLayout(state, action) {
  if (action.status === 'start') {
    // We could have a spinner or other animation here.
  } else if (action.status === 'error') {
    // Update state.ui to display error message.
  } else if (action.status === 'complete') {
    state = state.set('data', action.data);
    state = state.set('start', action.data);
    state = state.setIn(['ui', 'dirty'], false);
  }
  return state;
}

function changeEditMode(state, action) {
  const value = (action.value === 'edit' || action.value === 'play') ?
    action.value : 'edit';
  return state.setIn(['data', 'mode'], value);
}

function moveControl(state, move) {
  const offset = state.ui.targetOffset;
  const id = move.id || getMoveId(move.device, state.data.grid[move.device]);
  const gridPath = ['data', 'grid', move.device, id];
  state = state.setIn(gridPath, {
    name: move.control,
    x: move.x + offset.x,
    y: move.y + offset.y,
  });
  return updateDirty(state);
}

function getMoveId(device, moves) {
  const id = `${device}-${Date.now()}`;
  return (Object.keys(moves).indexOf(id) === -1) ? id : `${id}x`;
}

function updateTargetOffset(state, action) {
  state = state.setIn(['ui', 'targetOffset', 'x'], action.x);
  state = state.setIn(['ui', 'targetOffset', 'y'], action.y);
  return state;
}

function updateDirty(state) {
  const dirty = !isEqual(state.data, state.start);
  return state = state.setIn(['ui', 'dirty'], dirty);
}


export default LayoutReducer;
