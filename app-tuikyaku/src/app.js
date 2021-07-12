import { onIndexShow } from '../../kintone-api/api';

(() => {
  kintone.events.on(onIndexShow, onIndexShowHandler);
  kintone.events.on('app.record.edit.show', (event) => {
    // 対象のレコードの編集を無効にする
    const { record } = event;

    record['文字列__1行__1'].disabled = true;
    record['文字列__1行__0'].disabled = true;

    console.log('test');
    return event;
  });
})();
