import {onCreateSubmitSuccess, onIndexShow} from '../../kintone-api/api';
import onIndexShowHandler from './eventHandlers/onIndexShowHandler';
import onEditOrCreateSubmitSuccessHandler from './eventHandlers/onEditOrCreateSubmitSuccessHandler';

(() => {
  kintone.events.on(onIndexShow, onIndexShowHandler);
  kintone.events.on(onCreateSubmitSuccess, onEditOrCreateSubmitSuccessHandler);
})();
