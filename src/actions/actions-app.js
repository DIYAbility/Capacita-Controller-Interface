import * as type from '../constants/actions-app';

export function createLayout() {
  return { type: type.CREATE_LAYOUT };
}

export function selectLayout(value) {
  return { type: type.SELECT_LAYOUT, value };
}