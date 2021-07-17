import { onIndexShow } from '../../kintone-api/api';
import onIndexShowHandler from './eventHandlers/onIndexShowHandler';

(() => {
  kintone.events.on(onIndexShow, onIndexShowHandler);
})();
