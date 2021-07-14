import { onIndexShow, onEditOrCreate } from '../../kintone-api/api';
import onIndexShowHandler from './pages/onIndexShowHandler';
import onEditOrCreateHandler from './pages/onEditOrCreateHandler';

(() => {
  kintone.events.on(onIndexShow, onIndexShowHandler);
  kintone.events.on(onEditOrCreate, onEditOrCreateHandler);
  // kintone.events.on(onFieldChange(['開始', '終了']), onChangeTimeHandler);
})();
