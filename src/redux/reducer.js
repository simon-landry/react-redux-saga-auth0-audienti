import { combineReducers } from 'redux-immutable';
import { routerReducer } from 'react-router-redux';

import auth from 'redux/auth/reducer';

const rootReducer = combineReducers({
  routing: routerReducer,
  auth
});

export default rootReducer;
