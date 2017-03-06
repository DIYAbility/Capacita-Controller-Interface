import * as type from '../constants/actions-app';

export function moveControl(value) {
  return { type: type.MOVE_CONTROL, value };
}

export function updateTargetOffset(x, y) {
  return { type: type.UPDATE_TARGET_OFFSET, x, y };
}
