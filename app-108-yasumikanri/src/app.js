import {
  onCreate, onCreateSubmit, onEditOrCreate, onEditOrCreateSubmit, onIndexShow,
} from '../../kintone-api/api';
import onIndexShowHandler from './kintoneHandlers/onIndexShowHandler';
import onCreateHandler from './kintoneHandlers/onCreateHandler';
import onEditOrCreateSubmitHandler from './kintoneHandlers/eventHandlers/onEditOrCreateSubmitHandler';
import onEditOrCreateHandler from './kintoneHandlers/onEditOrCreateHandler';
import onCreateSubmitHandler from './kintoneHandlers/eventHandlers/onCreateSubmitHandler';

(() => {
  kintone.events.on(onIndexShow, onIndexShowHandler);
  kintone.events.on(onCreate, onCreateHandler);
  kintone.events.on(onEditOrCreate, onEditOrCreateHandler);
  // kintone.events.on(onCreateSubmit, onCreateSubmitHandler);
  kintone.events.on(onEditOrCreateSubmit, onEditOrCreateSubmitHandler);
})();
