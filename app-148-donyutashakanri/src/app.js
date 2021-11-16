import {onEditOrCreate, onFieldChange, onIndexShow} from '../../kintone-api/api';
import onIndexShowHandler from './pages/onIndexShowHandler';
import onEditOrCreateHandler from './pages/onEditOrCreateHandler';
import {onFieldChangeHandler} from './pages/onFieldChangeHandler';

const onField = [
  '適用年',
  '適用月',
];

(() => {
  kintone.events.on(onIndexShow, onIndexShowHandler);

  kintone.events.on(onEditOrCreate, onEditOrCreateHandler);

  kintone.events.on(onFieldChange(onField), onFieldChangeHandler);
})();
