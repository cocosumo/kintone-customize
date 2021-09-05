import { onCreate, onCreateSubmit, onIndexShow } from '../../kintone-api/api';
import onIndexShowHandler from './kintoneHandlers/onIndexShowHandler';
import onCreateHandler from './kintoneHandlers/onCreateHandler';
import onCreateSubmitHandler from './kintoneHandlers/eventHandlers/onCreateSubmitHandler';

(() => {
  kintone.events.on(onIndexShow, onIndexShowHandler);
  kintone.events.on(onCreate, onCreateHandler);
  kintone.events.on(onCreateSubmit, onCreateSubmitHandler);
})();
