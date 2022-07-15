import onTest from './handlers/kintone/onTest';

const onIndexShow : string[] = [
  'app.record.index.show',
  'mobile.app.record.index.show',
];

kintone.events.on(onIndexShow, onTest);
