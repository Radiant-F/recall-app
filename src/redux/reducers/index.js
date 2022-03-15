import {combineReducers} from 'redux';

import auth from './auth';
import posts from './posts';
import utils from './utils';

export default combineReducers({
  auth,
  utils,
  posts,
});
