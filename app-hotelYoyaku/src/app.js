import { onIndexShow, onEdit, onFieldChange } from '../../kintone-api/api';
import onIndexShowHandler from './pages/onIndexShowHandler';
import onEditShowHandler from './pages/onEditShowHandler';
import roomsTableHandler from './handlers/roomsTableHandler';

(() => {
  kintone.events.on(onIndexShow, onIndexShowHandler);
  kintone.events.on(onEdit, onEditShowHandler);
  kintone.events.on(onFieldChange('部屋'), roomsTableHandler);
})();
