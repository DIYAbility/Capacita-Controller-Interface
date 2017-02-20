import Immutable from 'seamless-immutable';
import * as type from '../constants/actions-layout';

const initialState = Immutable({});

function LayoutReducer(state = initialState, action) {
  switch (action.type) {
    case type.TOGGLE_EDITOR_MODE:
    case type.SAVE_LAYOUT:
      break;
    default:
      break;
  }
  return state;
}

export default LayoutReducer;
