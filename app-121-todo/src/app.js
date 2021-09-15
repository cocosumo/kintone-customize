import { onEditOrCreate, onIndexShow } from '../../kintone-api/api';
import onEditOrCreateHandler from './pages/onEditOrCreateHandler';
import onIndexShowHandler from './pages/onIndexShowHandler';

(() => {
  kintone.events.on(onIndexShow, onIndexShowHandler);
  kintone.events.on(onEditOrCreate, onEditOrCreateHandler);
})();
