import { onIndexShow } from '../../kintone-api/api';
import indexHandler from './pages/indexHandler';

(() => {
  kintone.events.on(onIndexShow, indexHandler);
})();
