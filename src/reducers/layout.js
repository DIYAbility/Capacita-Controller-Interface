import Immutable from 'seamless-immutable';
import * as type from '../constants/actions-layout';

let created = 0;

const initialState = Immutable({
  data: {
    id: null,
    name: null,
    device: 'xbox',
    view: 'detailed',
    mode: 'edit',
    grid: {
      xbox: [],
      ps4: [],
    },
  },
  ui: {
    targetOffset: { x: 0, y: 0 },
    dirty: false,
  }
});

function LayoutReducer(state = initialState, action) {
  switch (action.type) {
    case type.CREATE_LAYOUT:
      state = createLayout(state, action);
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
  state = initialState;
  return state.setIn(['data', 'name'], `Untitled ${++created}`);
}

function changeEditMode(state, action) {
  const value = (action.value === 'edit' || action.value === 'play') ?
    action.value : 'edit';
  return state.setIn(['data', 'mode'], value);
}

function moveControl(state, move) {
  const offset = state.ui.targetOffset;
  const gridArray = state.data.grid[move.device];
  const gridPath = ['data', 'grid', move.device, gridArray.length];
  state = state.setIn(gridPath, {
    name: move.control,
    x: move.x + offset.x,
    y: move.y + offset.y,
  });
  return state;
}

function updateTargetOffset(state, action) {
  state = state.setIn(['ui', 'targetOffset', 'x'], action.x);
  state = state.setIn(['ui', 'targetOffset', 'y'], action.y);
  return state;
}

function dirty() {

}

export default LayoutReducer;
