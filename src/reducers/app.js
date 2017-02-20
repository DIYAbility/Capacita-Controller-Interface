import Immutable from 'seamless-immutable';
import * as type from '../constants/actions-app';

const initialState = Immutable({ layouts: [] });

function AppReducer(state = initialState, action) {
  switch (action.type) {
    case type.CREATE_LAYOUT:
      const n = state.layouts.length;
      state = state.setIn(['layouts', n], `Layout ${n + 1}`);
      break;
    case type.SELECT_LAYOUT:
      break;
    default:
      break;
  }
  return state;
}

export default AppReducer;
