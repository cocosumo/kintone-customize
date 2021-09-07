import {
  onCreate, onEditOrCreate, onEditOrCreateSubmit, onIndexShow,
} from '../../kintone-api/api';
import onIndexShowHandler from './kintoneHandlers/onIndexShowHandler';
import onCreateHandler from './kintoneHandlers/onCreateHandler';
import onEditOrCreateSubmitHandler from './kintoneHandlers/eventHandlers/onEditOrCreateSubmitHandler';
import onEditOrCreateHandler from './kintoneHandlers/onEditOrCreateHandler';

(() => {
  kintone.events.on(onIndexShow, onIndexShowHandler);
  kintone.events.on(onCreate, onCreateHandler);
  kintone.events.on(onEditOrCreate, onEditOrCreateHandler);
  kintone.events.on(onEditOrCreateSubmit, onEditOrCreateSubmitHandler);
})();
