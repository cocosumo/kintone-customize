import {
  onCreate, onDetailEditCreate, onEdit, onEditOrCreate,
} from '../../kintone-api/api';
import onEditOrCreateHandler from './handlers/pages/onEditOrCreateHandler';
import onCreateHandler from './handlers/pages/onCreateHandler';
import onDetailEditCreateHandler from './handlers/pages/onDetailEditCreateHandler';
import onEditHandler from './handlers/pages/onEditHandler';

(() => {
  kintone.events.on(onCreate, onCreateHandler);
  kintone.events.on(onEdit, onEditHandler);
  kintone.events.on(onDetailEditCreate, onDetailEditCreateHandler);
  kintone.events.on(onEditOrCreate, onEditOrCreateHandler);
})();
