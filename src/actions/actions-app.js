import * as type from '../constants/actions-app';

export function changeAppPage(value) {
  return { type: type.CHANGE_APP_PAGE, value };
}

export function createLayout() {
  return { type: type.CREATE_LAYOUT };
}

export function selectLayout(value) {
  return { type: type.SELECT_LAYOUT, value };
}

export function saveLayout(value) {
  // TODO: Save to firebase. @param value will be null if not saved yet.
  return { type: type.SAVE_LAYOUT, value };
}

export function toggleEditMode(value) {
  return { type: type.TOGGLE_EDIT_MODE, value };
}
