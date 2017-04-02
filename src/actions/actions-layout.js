import * as type from '../constants/actions-layout';

export function createLayout() {
  return { type: type.CREATE_LAYOUT };
}

export function saveLayout(value) {
  // TODO: Save to firebase. @param value will be null if not saved yet.
  return { type: type.SAVE_LAYOUT, value };
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
