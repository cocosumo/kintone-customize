import {
  onCreate, onEditOrCreateSubmit, onIndexShow,
} from '../../kintone-api/api';
import onIndexShowHandler from './kintoneHandlers/onIndexShowHandler';
import onCreateHandler from './kintoneHandlers/onCreateHandler';
import onEditOrCreateSubmitHandler from './kintoneHandlers/eventHandlers/onEditOrCreateSubmitHandler';

(() => {
  kintone.events.on(onIndexShow, onIndexShowHandler);
  kintone.events.on(onCreate, onCreateHandler);
  kintone.events.on(onEditOrCreateSubmit, onEditOrCreateSubmitHandler);
})();
