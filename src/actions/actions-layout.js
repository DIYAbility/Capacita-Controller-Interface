import * as type from '../constants/actions-app';

export function moveControl(value) {
  return { type: type.MOVE_CONTROL, value };
}
