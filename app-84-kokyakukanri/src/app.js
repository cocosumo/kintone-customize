import {onIndexShow} from '../../kintone-api/api';
import recordindexshow from './pages/recordindexshow';
import './styles/customize.css';

(() => {
  // [レコード一覧画面]プルダウンによる絞り込みを行う
  kintone.events.on(onIndexShow, recordindexshow);
})();
