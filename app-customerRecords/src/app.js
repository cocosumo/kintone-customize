// import React from 'react';
'use strict';
import ReactDOM from 'react-dom';
import TableToolTip from './components/Layout/TableToolTip';

import {getSpaceElement} from '../../kintone-api/api.js';

// import MyImage from './assets/dog.jpg';
// import './index.css';


(function() {
  const recordShowHandler = (event) => {
    console.log('welcome to reacts');
    ReactDOM.render(<TableToolTip />,
        getSpaceElement('tableTooltip', event.type));
  };

  kintone.events.on([
    'app.record.detail.show',
    'mobile.app.record.detail.show',
    'app.record.edit.show',
    'mobile.app.record.edit.show',
    'app.record.create.show',
    'mobile.app.record.create.show',
  ], recordShowHandler);

})();

