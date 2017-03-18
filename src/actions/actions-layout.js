import * as type from '../constants/actions-app';

export function moveControl(value) {
  return { type: type.MOVE_CONTROL, value };
}

export function updateTargetOffset(x, y) {
  return { type: type.UPDATE_TARGET_OFFSET, x, y };
}

export function changeDevice(value) {
  return { type: type.CHANGE_LAYOUT_DEVICE, value };
}

export function changeView(value) {
  return { type: type.CHANGE_LAYOUT_VIEW, value };
}
