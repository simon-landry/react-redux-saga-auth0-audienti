import React from 'react';
import { render } from 'react-dom';
import { browserHistory } from 'react-router';
import Helmet from 'react-helmet'; // This should be removed later. It's now here just to show how it works.
import 'styles/app.scss';

import Router from 'router';

render(
  <div>
    <Helmet
      title="Audienti"
      meta={[{ name: 'description', content: 'This is a reat application.' }]}
    />
    <Router />
  </div>,
  document.getElementById('app-container')
);
