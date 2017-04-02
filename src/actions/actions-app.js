import * as type from '../constants/actions-app';

export function changeAppPage(value) {
  return { type: type.CHANGE_APP_PAGE, value };
}

export function selectLayout(value) {
  return { type: type.SELECT_LAYOUT, value };
}
