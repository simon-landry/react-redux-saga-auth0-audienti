import { combineReducers } from 'redux-immutable';
import { routerReducer } from 'react-router-redux';

import ui from 'redux/ui/reducer';
import auth from 'redux/auth/reducer';
import project from 'redux/project/reducer';
import keyword from 'redux/keyword/reducer';
import negativeKeyword from 'redux/negative_keyword/reducer';
import filterType from 'redux/filter_type/reducer';
import segment from 'redux/segment/reducer';
import workflow from 'redux/workflow/reducer';

const rootReducer = combineReducers({
  routing: routerReducer,
  ui,
  auth,
  project,
  keyword,
  negativeKeyword,
  segment,
  workflow,
  filterType,
});

export default rootReducer;
