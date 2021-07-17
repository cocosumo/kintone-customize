import { onIndexShow, onEditOrCreate, onEditOrCreateSubmit } from '../../kintone-api/api';
import onIndexShowHandler from './pages/onIndexShowHandler';
import onEditOrCreateHandler from './pages/onEditOrCreateHandler';
import onEditOrCreateSubmitHandler from './handlers/onEditOrCreateSubmitHandler';

(() => {
  kintone.events.on(onIndexShow, onIndexShowHandler);
  kintone.events.on(onEditOrCreate, onEditOrCreateHandler);
  kintone.events.on(onEditOrCreateSubmit, onEditOrCreateSubmitHandler);
})();
