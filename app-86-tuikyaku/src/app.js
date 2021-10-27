import {onEdit, onIndexShow} from '../../kintone-api/api';
import recordeditshow from './functions/recordeditshow';
import recordindexshow from './functions/recordindexshow';
// import recordindexshow from '../../app-84-kokyakukanri/src/pages/recordindexshow';

(() => {
  // [レコード編集画面]対象のレコードの編集を無効にする
  kintone.events.on(onEdit, recordeditshow);

  // [レコード一覧画面]プルダウンによる絞り込みを行う
  kintone.events.on(onIndexShow, recordindexshow);
})();
