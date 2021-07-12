import { onIndexShow } from '../../kintone-api/api';
import onIndexShowHandler from './eventHandlers/onIndexShowHandler';

(() => {
  kintone.events.on(onIndexShow, onIndexShowHandler);
  kintone.events.on('app.record.edit.show', function(event) {
    //対象のレコードの編集を無効にする
    var record = event.record;
    
    record['文字列__1行__1'].disabled = true;
    record['文字列__1行__0'].disabled = true;

    console.log("test")
    return event;
});
})();
