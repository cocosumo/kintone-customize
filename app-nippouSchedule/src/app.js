import { onEditOrCreate } from '../../kintone-api/api';
// import onDateChangeHandler from './handlers/fieldChange/onDateChangeHandler';
import onEditOrCreateHandler from './handlers/pages/onEditOrCreateHandler';

(() => {
  kintone.events.on(onEditOrCreate, onEditOrCreateHandler);
})();
