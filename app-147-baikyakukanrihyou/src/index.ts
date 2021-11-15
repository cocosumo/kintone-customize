import {onIndexShow} from '../../kintone-api/typescript/typedAPI';
import onIndexShowHandler from './pages/onIndexShowHandler';

(() => {
  kintone.events.on(onIndexShow, onIndexShowHandler);
})();
