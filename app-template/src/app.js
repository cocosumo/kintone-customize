import { onIndexShow } from '../../kintone-api/api';
import onIndexShowHandler from './pages/onIndexShowHandler';

(() => {
  kintone.events.on(onIndexShow, onIndexShowHandler);
})();
