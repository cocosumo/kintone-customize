// import onIndexShowHandler from './pageShowHandlers/onIndexShowHandler';
import onIndexShowHandler from './pageShowHandlers/onIndexShowHandler';
import './app.css';

import {onIndexShow} from '@yumetetsu/library';

(() => {

  kintone.events.on(onIndexShow, onIndexShowHandler);
})();
