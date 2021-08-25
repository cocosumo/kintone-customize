import recordeditshow from './functions/recordeditshow';
import recoedindexshow from './functions/recoedindexshow';

(() => {
  // [レコード編集画面]対象のレコードの編集を無効にする
  kintone.events.on('app.record.edit.show', recordeditshow);
  kintone.events.on('mobile.app.record.edit.show', recordeditshow);

  // [レコード一覧画面]プルダウンによる絞り込みを行う
  kintone.events.on('app.record.index.show', recoedindexshow);
  kintone.events.on('mobile.app.record.index.show', recoedindexshow);
})();
