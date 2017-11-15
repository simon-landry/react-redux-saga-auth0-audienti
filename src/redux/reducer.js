import { combineReducers } from 'redux-immutable';
import { routerReducer } from 'react-router-redux';

import ui from 'redux/ui/reducer';
import auth from 'redux/auth/reducer';
import project from 'redux/project/reducer';

const rootReducer = combineReducers({
  routing: routerReducer,
  ui,
  auth,
  project,
});

export default rootReducer;
