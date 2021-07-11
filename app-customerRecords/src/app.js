import { onIndexShow } from '../../kintone-api/api';
import onIndexShowHandler from './eventHandlers/onIndexShowHandler';

(() => {
  var e;
  
  kintone.events.on(onIndexShow, onIndexShowHandler);
})();
