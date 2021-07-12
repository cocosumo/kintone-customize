import { onIndexShow, onEdit } from '../../kintone-api/api';
import onIndexShowHandler from './pages/onIndexShowHandler';
import onEditShowHandler from './pages/onEditShowHandler';

(() => {
  kintone.events.on(onIndexShow, onIndexShowHandler);
  kintone.events.on(onEdit, onEditShowHandler);
})();
