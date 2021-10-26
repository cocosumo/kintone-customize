
import onIndexShowHandler from './handlers/kintone/onIndexShowHandler';

const onIndexShow : string[] = [
  'app.record.index.show',
  'mobile.app.record.index.show',
];

kintone.events.on(onIndexShow, onIndexShowHandler);
