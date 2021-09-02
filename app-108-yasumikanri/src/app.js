import { onCreate, onIndexShow } from '../../kintone-api/api';
import onIndexShowHandler from './pages/onIndexShowHandler';
import onCreateHandler from './pages/onCreateHandler';

(() => {
  kintone.events.on(onIndexShow, onIndexShowHandler);

  kintone.events.on(onCreate, onCreateHandler);
})();
