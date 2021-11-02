
import onTest from './handlers/kintone/onTest';

const onIndexShow : string[] = [
  'portal.show',
];

kintone.events.on(onIndexShow, onTest);
