import * as type from '../constants/actions-layout';
import * as api from '../util/api';

export function createLayout() {
  return { type: type.CREATE_LAYOUT };
}

export function saveLayout(value) {
  return dispatch => {
    dispatch({ type: type.SAVE_LAYOUT, status: 'start' });
    api.saveLayout(value.asMutable({ deep: true })).then(data => {
      dispatch({ type: type.SAVE_LAYOUT, status: 'complete', data });
    }).catch(error => {
      dispatch({ type: type.SAVE_LAYOUT, status: 'error', error });
    });
  }
}

export function fetchLayout(value) {
  return dispatch => {
    dispatch({ type: type.FETCH_LAYOUT, status: 'start' });
    api.fetchLayout(value).then(data => {
      dispatch({ type: type.FETCH_LAYOUT, status: 'complete', data });
    }).catch(error => {
      dispatch({ type: type.FETCH_LAYOUT, status: 'error', error });
    });
  }
}

export function moveControl(value) {
  return { type: type.MOVE_CONTROL, value };
}

export function updateTargetOffset(x, y) {
  return { type: type.UPDATE_TARGET_OFFSET, x, y };
}

export function changeEditMode(value) {
  return { type: type.CHANGE_EDIT_MODE, value };
}

export function changeDevice(value) {
  return { type: type.CHANGE_DEVICE, value };
}

export function changeView(value) {
  return { type: type.CHANGE_VIEW, value };
}
