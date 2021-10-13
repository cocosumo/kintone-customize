import { onIndexShow } from '../../kintone-api/api';
import recordindexshow from './pages/recordindexshow';

(() => {
  // [レコード一覧画面]プルダウンによる絞り込みを行う
  kintone.events.on(onIndexShow, recordindexshow);
})();
