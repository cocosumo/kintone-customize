import {
  onCreate, onEditOrCreate, onEditOrCreateSubmit, onFieldChange, onIndexShow,
} from '../../kintone-api/api';
import onIndexShowHandler from './kintoneHandlers/onIndexShowHandler';
import onCreateHandler from './kintoneHandlers/onCreateHandler';
import onEditOrCreateSubmitHandler from './kintoneHandlers/eventHandlers/onEditOrCreateSubmitHandler';
import onEditOrCreateHandler from './kintoneHandlers/onEditOrCreateHandler';
import onTypeChangeHandler from './kintoneHandlers/eventHandlers/onTypeChangeHandler';

(() => {
  kintone.events.on(onIndexShow, onIndexShowHandler);
  kintone.events.on(onCreate, onCreateHandler);
  kintone.events.on(onEditOrCreate, onEditOrCreateHandler);
  kintone.events.on(onEditOrCreateSubmit, onEditOrCreateSubmitHandler);
  kintone.events.on(onFieldChange('type'), onTypeChangeHandler);
})();
