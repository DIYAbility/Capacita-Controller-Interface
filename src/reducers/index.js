import { combineReducers } from 'redux';
import app from './app';
import layout from './layout';

const reducers = combineReducers({
  app,
  layout,
});

export default reducers;
