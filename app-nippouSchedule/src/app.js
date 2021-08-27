import { onCreate, onEditOrCreate } from '../../kintone-api/api';
// import onDateChangeHandler from './handlers/fieldChange/onDateChangeHandler';
import onEditOrCreateHandler from './handlers/pages/onEditOrCreateHandler';
import onCreateHandler from './handlers/pages/onCreateHandler';

(() => {
  kintone.events.on(onCreate, onCreateHandler);
  kintone.events.on(onEditOrCreate, onEditOrCreateHandler);
})();
