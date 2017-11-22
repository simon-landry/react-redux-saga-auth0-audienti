import { combineReducers } from 'redux-immutable';
import { routerReducer } from 'react-router-redux';

import ui from 'redux/ui/reducer';
import auth from 'redux/auth/reducer';
import project from 'redux/project/reducer';
import keyword from 'redux/keyword/reducer';
import negativeKeyword from 'redux/negative_keyword/reducer';

const rootReducer = combineReducers({
  routing: routerReducer,
  ui,
  auth,
  project,
  keyword,
  negativeKeyword,
});

export default rootReducer;
