import { onCreate, onDetailEditCreate, onEditOrCreate } from '../../kintone-api/api';
import onEditOrCreateHandler from './handlers/pages/onEditOrCreateHandler';
import onCreateHandler from './handlers/pages/onCreateHandler';
import onDetailEditCreateHandler from './handlers/pages/onDetailEditCreateHandler';

(() => {
  kintone.events.on(onCreate, onCreateHandler);
  kintone.events.on(onDetailEditCreate, onDetailEditCreateHandler);
  kintone.events.on(onEditOrCreate, onEditOrCreateHandler);
})();
