import React from 'react';
import 'redux/localStorage';
import { render } from 'react-dom';
import { browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import { fromJS } from 'immutable';
import configureStore from 'redux/store';
import I18n from 'components/I18n';
import 'styles/app.scss';

import Router from 'router';

const initialState = fromJS({});
const store = configureStore(initialState);

render(
  <Provider store={store}>
    <I18n>
      <Router />
    </I18n>
  </Provider>,
  document.getElementById('app-container')
);
