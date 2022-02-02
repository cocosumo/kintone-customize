import {
  onCreate, onEdit, onDetailEditCreate, onEditOrCreate,
} from '../../kintone-api/api';
import onCreateHandler from '../../app-98-nippou/src/handlers/pages/onCreateHandler';
import onEditHandler from '../../app-98-nippou/src/handlers/pages/onEditHandler';
import onDetailEditCreateHandler from '../../app-98-nippou/src/handlers/pages/onDetailEditCreateHandler';
import onEditOrCreateHandler from '../../app-98-nippou/src/handlers/pages/onEditOrCreateHandler';

(() => {
  kintone.events.on(onCreate, onCreateHandler);
  kintone.events.on(onEdit, onEditHandler);
  kintone.events.on(onDetailEditCreate, onDetailEditCreateHandler);
  kintone.events.on(onEditOrCreate, (event)=>onEditOrCreateHandler(event, 178));
})();
